import { SourceMaterial, SourceMaterialForm } from "@/types"
import { Select, SelectItem, Textarea } from "@heroui/react"
import { Book } from "lucide-react"

type props = {
  sources: SourceMaterial[]
  value: SourceMaterialForm
  onChange: (update: SourceMaterialForm) => void
}

export default function SourceLessonSelector({sources, value, onChange}: props) {
  const selected = 
    value?.type === "custom"
      ? ["custom"] 
    : value?.id ? [value.id]
    : undefined

  return (
    <>
    <div className="flex gap-4">
      <Select
        data-testid="quiz-create-lesson-selector"
        label="Source Lesson"
        name="sourceLessonId"
        placeholder="Select Source Lesson"
        labelPlacement="outside"
        selectedKeys={selected}
        onSelectionChange={(key) =>{
            if (key.currentKey === "custom") {
              onChange({type: "custom", id: undefined, content: value?.content ?? ""})
            } else if (typeof key.currentKey === "string") {
              onChange({type: "source", id: key.currentKey, content: value?.content})
            }
          }
        }
        startContent={<Book size={18} />}
        // isDisabled={profilesLoading}
        fullWidth
        required
      >
        <>
          {sources.map((source, i) => (
            <SelectItem key={i}>
              {source.title}
            </SelectItem>
          ))}
          <SelectItem key="custom">
            Custom Lesson
          </SelectItem>
        </>
      </Select>
    </div>
    {value?.type === "custom" 
      && <Textarea
            data-testid="source-lesson-material"
            label="Custom Source"
            name="customer-source"
            placeholder="Content used to build the quiz"
            value={value.content}
            onChange={(e) => {
              onChange({...value, content: e.target.value})
            }}
            labelPlacement="outside"
            fullWidth
            required
            rows={4}
          />
      }
  </>
  )
}
