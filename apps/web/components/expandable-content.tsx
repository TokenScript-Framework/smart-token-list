import React, { useState } from "react"

interface ExpandableContentProps {
  description: string
  maxLength?: number
}

export const ExpandableContent: React.FC<ExpandableContentProps> = ({
  description,
  maxLength = 150,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  if (description.length <= maxLength) {
    return <p>{description}</p>
  }

  return (
    <div>
      <p className="inline-block">
        {isExpanded ? description : `${description.slice(0, maxLength)}...`}{" "}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          type="button"
          className="text-primary/70 inline-block"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </p>
    </div>
  )
}
