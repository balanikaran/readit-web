import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPassword: React.FC<{}> = ({}) => {
  const router = useRouter();

  const [, forgotPassword] = useForgotPasswordMutation();
  const [isEmailSent, setIsEmailSent] = useState(false);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          console.log(values);
          const response = await forgotPassword({
            email: values.email,
          });

          if (response.data?.forgotPassword) {
            setIsEmailSent(true);
          } else if (response.data?.forgotPassword) {
            // could not send the email
            // leave
          }
        }}
      >
        {({ isSubmitting }) =>
          isEmailSent ? (
            <Box>
              if an account with that email exists, a reset link is sent to the
              email
            </Box>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
              />
              <Button
                type="submit"
                colorScheme="teal"
                mt="8"
                isLoading={isSubmitting}
              >
                send reset link
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
