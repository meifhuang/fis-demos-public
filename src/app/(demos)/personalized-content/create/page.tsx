"use client";

import { useGeneratePersonalizedContent, useSavePersonalizedContent } from "@/features/personalized-content";
import { useLearnerProfiles } from "@demos/_store/useLearnerProfiles";
import { useSourceMaterials } from "@/features/source-materials";
import { PersonalizedContentFormState } from "@/types";
import {
  Card,
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  Spinner,
} from "@heroui/react";
import { User, Send } from "lucide-react";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function PersonalizedContentForm() {
  const [formData, setFormData] = useState<PersonalizedContentFormState>({
    id: "1",
    title: "",
    sourceMaterial: "",
    learnerProfileId: "",
    customization: "",
  });

  const { data: profiles, isLoading: profilesLoading } = useLearnerProfiles();
  const { data: sourceMaterials, isLoading: sourceMaterialsLoading } = useSourceMaterials();
  const { mutateAsync: createPersonalizedContent, isPending: isSubmitting } =
    useGeneratePersonalizedContent();

  const { mutateAsync: savePersonalizedContent } = useSavePersonalizedContent();

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Simplified handler for select (used for learnerProfileId and sourceMaterial)
  const handleSelectChange = (name: string, value: string | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value?.toString() ?? "",
    }));
  };

  const isFormValid = useMemo(() => {
    const {
      title,
      learnerProfileId,
      sourceMaterial,
    } = formData;
    return (
      title.trim().length > 0 &&
      sourceMaterial !== "" &&
      learnerProfileId !== ""
    );
  }, [formData]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Find the full profile and sourceMaterial objects based on selected IDs
    const learnerProfile = profiles?.find(
      (p) => p.id === formData.learnerProfileId
    );

    const sourceMaterial = sourceMaterials?.find(
      (l) => l.id.toString() === formData.sourceMaterial
    );

    if (isFormValid && !isSubmitting) {
      // Structure data for API submission
      const submissionData = {
        ...formData,
        learnerProfile,
        sourceMaterial: sourceMaterial?.markdown ?? "",
      };

      const createdPersonalizedContent = await createPersonalizedContent(submissionData);

      // save the title, profile, and source material from the form
      const savedPersonalizedContent = await savePersonalizedContent({
        content: createdPersonalizedContent.content,
        title: formData.title,
        description: createdPersonalizedContent.description,
        creation_meta: { learner_profile: learnerProfile, source_material: sourceMaterial?.toJSON() },
      });

      router.push(`/personalized-content/${savedPersonalizedContent.id}/edit`);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Create New Personalized Content
      </h1>
      <Card className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. TITLE INPUT */}
          <Input
            data-testid="personalized-content-create-title"
            label="Personalized Content Title"
            name="title"
            placeholder="e.g., Python for Data Analysis"
            value={formData.title}
            onChange={handleChange}
            labelPlacement="outside"
            fullWidth
            required
          />

          <div className="flex mb-12">
            {/* 2. Source Lesson Selection */}
            <Select
              data-testid="personalized-content-create-source-material"
              label="Source Material"
              name="sourceMaterial"
              placeholder={
                sourceMaterialsLoading
                  ? "Loading source materials..."
                  : "Select existing source material"
              }
              labelPlacement="outside"
              onSelectionChange={(key) =>
                handleSelectChange("sourceMaterial", key.currentKey)
              }
              isDisabled={sourceMaterialsLoading}
              fullWidth
              required
            >
              <>
                {sourceMaterials?.map((sourceMaterial) => (
                  <SelectItem key={sourceMaterial.id.toString()}>
                    {sourceMaterial.title}
                  </SelectItem>
                ))}
              </>
            </Select>
          </div>

          {/* 3. LEARNER PROFILE SELECTION */}
          <Select
            data-testid="personalized-content-create-learner-profile"
            label="Target Learner Profile"
            name="learnerProfileId"
            placeholder={
              profilesLoading
                ? "Loading profiles..."
                : "Select existing profile"
            }
            labelPlacement="outside"
            onSelectionChange={(key) =>
              handleSelectChange("learnerProfileId", key.currentKey)
            }
            startContent={<User size={18} />}
            isDisabled={profilesLoading}
            fullWidth
            required
          >
            <>
              {profiles?.map((profile) => (
                <SelectItem key={profile.id.toString()}>
                  {profile.label}
                </SelectItem>
              ))}
            </>
          </Select>

          {/* 4. CUSTOMIZATION TEXTAREA */}
          <Textarea
            label="Customization"
            name="customization"
            placeholder="How else would you like to modify this content?"
            value={formData.customization}
            onChange={handleChange}
            labelPlacement="outside"
            fullWidth
            rows={4}
          />

          {/* SUBMIT BUTTON */}
          <Button
            data-testid="personalized-content-create-submit"
            type="submit"
            color="primary"
            fullWidth
            isDisabled={!isFormValid || isSubmitting}
            startContent={
              isSubmitting ? (
                <Spinner size="sm" color="white" />
              ) : (
                <Send size={18} />
              )
            }
          >
            {isSubmitting
              ? "Creating Personalized Content..."
              : "Create Personalized Content"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
