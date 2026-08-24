import type { ChecklistField, ChecklistAnswers } from '../../types'

interface FieldProps {
  field: ChecklistField
  value: ChecklistAnswers[string]
  onChange: (id: string, value: ChecklistAnswers[string]) => void
}

export function Field({ field, value, onChange }: FieldProps) {
  const label = (
    <label className="field-label" htmlFor={field.id}>
      {field.label}
      {field.required && <span className="field-required">*</span>}
      {field.unit && <span className="field-unit"> ({field.unit})</span>}
    </label>
  )

  if (field.type === 'boolean') {
    return (
      <div className="field field-boolean">
        <label className="field-label" htmlFor={field.id}>
          {field.label}
        </label>
        <div className="toggle-group" role="group" aria-label={field.label}>
          <button
            type="button"
            className={`toggle-btn ${value === true ? 'active' : ''}`}
            onClick={() => onChange(field.id, true)}
          >
            Oui
          </button>
          <button
            type="button"
            className={`toggle-btn ${value === false ? 'active' : ''}`}
            onClick={() => onChange(field.id, false)}
          >
            Non
          </button>
        </div>
        {field.helpText && <p className="field-help">{field.helpText}</p>}
      </div>
    )
  }

  if (field.type === 'select') {
    return (
      <div className="field">
        {label}
        <select
          id={field.id}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(field.id, e.target.value)}
        >
          <option value="" disabled>
            Sélectionner…
          </option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {field.helpText && <p className="field-help">{field.helpText}</p>}
      </div>
    )
  }

  if (field.type === 'textarea') {
    return (
      <div className="field">
        {label}
        <textarea
          id={field.id}
          rows={3}
          placeholder={field.placeholder}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      </div>
    )
  }

  if (field.type === 'number') {
    return (
      <div className="field">
        {label}
        <input
          id={field.id}
          type="number"
          inputMode="decimal"
          placeholder={field.placeholder}
          value={value === undefined ? '' : (value as number)}
          onChange={(e) => onChange(field.id, e.target.value === '' ? undefined : Number(e.target.value))}
        />
        {field.helpText && <p className="field-help">{field.helpText}</p>}
      </div>
    )
  }

  return (
    <div className="field">
      {label}
      <input
        id={field.id}
        type="text"
        placeholder={field.placeholder}
        value={(value as string) ?? ''}
        onChange={(e) => onChange(field.id, e.target.value)}
      />
      {field.helpText && <p className="field-help">{field.helpText}</p>}
    </div>
  )
}
