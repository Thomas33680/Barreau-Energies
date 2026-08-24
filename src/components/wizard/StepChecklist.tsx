import { useState } from 'react'
import { getChecklist } from '../../data/checklists'
import { Field } from '../ui/Field'
import type { ChecklistAnswers, InstallationType } from '../../types'

interface Props {
  installationType: InstallationType
  answers: ChecklistAnswers
  onChange: (id: string, value: ChecklistAnswers[string]) => void
  onDone: () => void
  onBackToStart: () => void
}

export function StepChecklist({ installationType, answers, onChange, onDone, onBackToStart }: Props) {
  const sections = getChecklist(installationType)
  const [sectionIndex, setSectionIndex] = useState(0)
  const section = sections[sectionIndex]
  const isFirst = sectionIndex === 0
  const isLast = sectionIndex === sections.length - 1

  function next() {
    if (isLast) {
      onDone()
    } else {
      setSectionIndex((i) => i + 1)
    }
  }

  function prev() {
    if (isFirst) {
      onBackToStart()
    } else {
      setSectionIndex((i) => i - 1)
    }
  }

  return (
    <div className="step-panel">
      <div className="checklist-subheader">
        <h2>{section.title}</h2>
        <span className="checklist-progress">
          Section {sectionIndex + 1} / {sections.length}
        </span>
      </div>
      <div className="checklist-fields">
        {section.fields.map((field) => (
          <Field key={field.id} field={field} value={answers[field.id]} onChange={onChange} />
        ))}
      </div>
      <div className="wizard-nav">
        <button type="button" className="btn btn-secondary" onClick={prev}>
          ← Précédent
        </button>
        <button type="button" className="btn btn-primary" onClick={next}>
          {isLast ? 'Voir la recommandation →' : 'Suivant →'}
        </button>
      </div>
    </div>
  )
}
