import { Alert } from "@chakra-ui/react";

type Props = { messages: string[] };

export default function ErrorMessages({ messages }: Props) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 space-y-3 w-full max-w-md z-50 p-3">
      {messages.map((msg, i) => (
        <Alert.Root status="error" key={i} className="shadow-lg rounded-lg">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>{msg}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      ))}
    </div>
  );
}
