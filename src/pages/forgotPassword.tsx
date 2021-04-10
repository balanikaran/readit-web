import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import {
  useForgotPasswordMutation,
  useLoginMutation,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();

  const [, forgotPassword] = useForgotPasswordMutation();
  const [isEmailSent, setIsEmailSent] = useState(false);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors }) => {
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
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" placeholder="email" label="Email" />
            {!isEmailSent ? null : <Box>please check your email</Box>}
            <Button
              type="submit"
              colorScheme="teal"
              mt="8"
              isLoading={isSubmitting}
            >
              send reset link
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
