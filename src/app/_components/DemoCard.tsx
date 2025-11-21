"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@heroui/react";
import { CirclePlay } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface DemoCardProps {
  title: string;
  description: string;
  href: string;
  imageSource?: string;
}

export default function DemoCard({
  title,
  description,
  href,
  imageSource,
}: DemoCardProps) {
  const router = useRouter();

  return (
    <Card data-testid="demo-card" className="max-w-72">
      {imageSource && (
        <Image width={300} height={300} src={imageSource} alt={title} />
      )}
      {!imageSource && (
        <CardHeader>
          <h3 className="text-2xl">{title}</h3>
        </CardHeader>
      )}
      <Divider />
      <CardBody>
        {imageSource && <h3 className="text-2xl">{title}</h3>}
        {description}
      </CardBody>
      <CardFooter>
        <Button
          data-testid={`demo-card-button`}
          color="primary"
          onPress={() => router.push(href)}
        >
          <CirclePlay />
          View Demo
        </Button>
      </CardFooter>
    </Card>
  );
}
