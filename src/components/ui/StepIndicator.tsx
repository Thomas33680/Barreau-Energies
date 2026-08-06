interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="step-indicator">
      {steps.map((label, idx) => (
        <div key={label} className={`step-dot-wrap ${idx === currentStep ? 'current' : ''} ${idx < currentStep ? 'done' : ''}`}>
          <span className="step-dot">{idx < currentStep ? '✓' : idx + 1}</span>
          <span className="step-label">{label}</span>
        </div>
      ))}
    </div>
  )
}
