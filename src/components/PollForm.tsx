"use client";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  sourceApi: string;
  destinationWebhook: string;
  interval: number;
};

export default function PollForm() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  async function onSubmit(values: FormValues) {
    const response = await fetch("/api/poll/create", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json; charset=utf8",
      },
    });
    const { poll } = await response.json();
  }

  const formData = {
    sapi: {
      id: "sourceApi",
      placeholder: "https://source-endpoint-to-look-for-change.com",
      label: "Endpoint to poll",
    },
    dwh: {
      id: "destinationWebhook",
      placeholder: "https://notify-me-endopoint.com",
      label: "Notification Webhook",
    },
    inter: {
      id: "interval",
      label: "Interval",
      placeholder: "Interval between two polls",
      min: 1,
      max: 3600 * 24,
    },
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors?.sourceApi ? true : false}>
        <FormLabel htmlFor={formData.sapi.id}>{formData.sapi.label}</FormLabel>
        <Input
          placeholder={formData.sapi.placeholder}
          {...register("sourceApi", {
            required: true,
            pattern: { value: /^https?/i, message: "Must be a valid url." },
          })}
        />
        <FormErrorMessage>{errors?.sourceApi?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors?.destinationWebhook ? true : false}>
        <FormLabel htmlFor={formData.dwh.id}>{formData.dwh.label}</FormLabel>
        <Input
          placeholder={formData.dwh.placeholder}
          {...register("destinationWebhook", {
            pattern: {
              value: /^https?:\/\//i,
              message: "Must be a valid url.",
            },
          })}
        />
        <FormErrorMessage>
          {errors?.destinationWebhook?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors?.interval ? true : false}>
        <FormLabel htmlFor={formData.inter.id}>Interval</FormLabel>
        <NumberInput
          defaultValue={10}
          min={formData.inter.min}
          max={formData.inter.max}
        >
          <NumberInputField
            {...register("interval", { valueAsNumber: true })}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormHelperText>
          Interval in seconds between consecutive poll requests.
        </FormHelperText>

        <FormErrorMessage>{errors?.interval?.message}</FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Start Polling
      </Button>
    </form>
  );
}
