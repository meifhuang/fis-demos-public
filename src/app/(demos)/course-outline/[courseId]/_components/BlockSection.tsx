import { LucideIcon, Lightbulb, CheckCircle } from "lucide-react";
import { Chip, Card, CardHeader, CardBody } from "@heroui/react";

interface SectionCardProps {
  title: string;
  rationale: string;
  assessment: string;
  Icon: LucideIcon;
}

export default function BlockSection({
  title,
  rationale,
  assessment,
  Icon,
}: SectionCardProps) {
  return (
    <Card className="shadow-sm transition duration-150 hover:shadow-md h-full">
      <CardHeader className="flex flex-col items-start pb-2">
        <h4 className="flex items-center text-base font-semibold text-gray-800">
          <Icon className="w-5 h-5 text-indigo-500 mr-2" />
          {title}
        </h4>
      </CardHeader>

      <CardBody className="space-y-3 pt-2 border-t border-gray-100">
        {/* Rationale Section */}
        <div>
          <Chip
            size="sm"
            color="primary"
            variant="flat"
            startContent={<Lightbulb className="w-3 h-3" />}
            className="mb-1"
          >
            Rationale
          </Chip>
          <p className="text-gray-700 text-sm italic">{rationale}</p>
        </div>

        {/* Assessment Section */}
        <div>
          <Chip
            size="sm"
            color="success"
            variant="flat"
            startContent={<CheckCircle className="w-3 h-3" />}
            className="mb-1"
          >
            Assessment
          </Chip>
          <p className="text-gray-700 text-sm">{assessment}</p>
        </div>
      </CardBody>
    </Card>
  );
}
