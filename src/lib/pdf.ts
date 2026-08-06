import { jsPDF } from 'jspdf'
import type { AideEstimate, CompanyInfo, Devis, DevisLine, Visit } from '../types'
import { getInstallationTypeInfo } from '../data/installationTypes'
import { getBrand } from '../data/brands'
import { formatEUR } from './calculations'

const MARGIN = 15
const PAGE_WIDTH = 210

function shortId(id: string): string {
  return id.replace(/-/g, '').slice(0, 8).toUpperCase()
}

function drawLinesTable(doc: jsPDF, title: string, lines: DevisLine[], y: number): number {
  if (lines.length === 0) return y
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text(title, MARGIN, y)
  y += 5

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  for (const line of lines) {
    doc.text(line.label, MARGIN, y)
    const qtyLabel = line.quantite !== 1 ? `${line.quantite} x ${formatEUR(line.prixUnitaire)}` : ''
    doc.text(qtyLabel, PAGE_WIDTH - MARGIN - 55, y, { align: 'left' })
    doc.text(formatEUR(line.total), PAGE_WIDTH - MARGIN, y, { align: 'right' })
    y += 5.5
  }
  return y + 2
}

export interface BuildPdfInput {
  visit: Visit
  company: CompanyInfo
  devis: Devis
  aides: AideEstimate
  sizingLabel: string
}

export function buildDevisPdf({ visit, company, devis, aides, sizingLabel }: BuildPdfInput): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const typeInfo = getInstallationTypeInfo(visit.installationType)
  const brand = visit.selectedBrandId ? getBrand(visit.selectedBrandId) : undefined

  let y = MARGIN

  if (company.logoDataUrl) {
    try {
      doc.addImage(company.logoDataUrl, 'PNG', MARGIN, y, 22, 22, undefined, 'MEDIUM')
    } catch {
      // ignore malformed logo
    }
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.text(company.nom || 'Entreprise', PAGE_WIDTH - MARGIN, y + 4, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  const companyLines = [company.adresse, company.telephone, company.email, company.siret ? `SIRET ${company.siret}` : '']
    .filter(Boolean)
    .join('\n')
  doc.text(companyLines, PAGE_WIDTH - MARGIN, y + 10, { align: 'right' })

  y += 30
  doc.setDrawColor(200)
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
  y += 10

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text('DEVIS', MARGIN, y)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`N° ${shortId(visit.id)}  •  Date : ${visit.client.dateVisite}`, MARGIN, y + 6)
  y += 16

  doc.setFont('helvetica', 'bold')
  doc.text('Client', MARGIN, y)
  y += 5
  doc.setFont('helvetica', 'normal')
  const clientLines = [visit.client.nom, visit.client.adresse, visit.client.telephone, visit.client.email]
    .filter(Boolean)
    .join('\n')
  doc.text(clientLines, MARGIN, y)
  y += clientLines.split('\n').length * 5 + 6

  doc.setFont('helvetica', 'bold')
  doc.text('Objet', MARGIN, y)
  doc.setFont('helvetica', 'normal')
  const objet = `${typeInfo?.label ?? ''}${brand ? ` — ${brand.name}` : ''} — ${sizingLabel}`
  doc.text(objet, MARGIN + 16, y)
  y += 10

  y = drawLinesTable(doc, 'Matériel', devis.materiel, y)
  y = drawLinesTable(doc, "Main d'œuvre", devis.mainOeuvre, y)
  y = drawLinesTable(doc, 'Options', devis.options, y)

  doc.setDrawColor(220)
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
  y += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('Sous-total HT', PAGE_WIDTH - MARGIN - 55, y)
  doc.text(formatEUR(devis.sousTotalHT), PAGE_WIDTH - MARGIN, y, { align: 'right' })
  y += 6
  doc.text(`TVA (${devis.tva}%)`, PAGE_WIDTH - MARGIN - 55, y)
  doc.text(formatEUR(devis.montantTva), PAGE_WIDTH - MARGIN, y, { align: 'right' })
  y += 6
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Total TTC', PAGE_WIDTH - MARGIN - 55, y)
  doc.text(formatEUR(devis.totalTTC), PAGE_WIDTH - MARGIN, y, { align: 'right' })
  y += 10

  if (aides.lignes.length > 0) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text('Aides estimées (sous réserve d\'éligibilité)', MARGIN, y)
    y += 5
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    for (const ligne of aides.lignes) {
      doc.text(ligne.label, MARGIN, y)
      doc.text(`- ${formatEUR(ligne.amount)}`, PAGE_WIDTH - MARGIN, y, { align: 'right' })
      y += 5.5
    }
    doc.setFont('helvetica', 'bold')
    doc.text('Reste à charge estimé TTC', MARGIN, y)
    doc.text(formatEUR(Math.max(0, devis.totalTTC - aides.total)), PAGE_WIDTH - MARGIN, y, { align: 'right' })
    y += 6
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(120)
    const noteLines = doc.splitTextToSize(aides.note, PAGE_WIDTH - 2 * MARGIN)
    doc.text(noteLines, MARGIN, y)
    doc.setTextColor(0)
    y += noteLines.length * 3.5 + 4
  }

  y += 4
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(110)
  const mentions = [
    'Devis valable 3 mois à compter de sa date d\'émission.',
    company.assurance || undefined,
    "Conformément aux articles L221-18 et suivants du Code de la consommation, pour tout contrat conclu hors établissement, le client dispose d'un délai de rétractation de 14 jours à compter de sa signature.",
  ]
    .filter((l): l is string => Boolean(l))
    .join('\n')
  const mentionLines = doc.splitTextToSize(mentions, PAGE_WIDTH - 2 * MARGIN)
  doc.text(mentionLines, MARGIN, y)
  doc.setTextColor(0)
  y += mentionLines.length * 3.5 + 10

  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('Bon pour accord, signature du client :', MARGIN, y)
  y += 4

  if (visit.signatureDataUrl) {
    try {
      doc.addImage(visit.signatureDataUrl, 'PNG', MARGIN, y, 60, 25, undefined, 'MEDIUM')
    } catch {
      // ignore malformed signature
    }
    if (visit.signedAt) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text(`Signé le ${new Date(visit.signedAt).toLocaleDateString('fr-FR')}`, MARGIN, y + 29)
    }
  } else {
    doc.rect(MARGIN, y, 60, 25)
  }

  return doc
}

export function devisFileName(visit: Visit): string {
  const nom = visit.client.nom.trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '') || 'client'
  return `devis-${nom}-${shortId(visit.id)}.pdf`
}
