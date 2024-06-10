'use client'
import React from "react";
import styled from "styled-components";
import { Network } from "../../components/Network";
import { Inspect } from "../../components/Inspect";
import { Report } from "../../components/Report";
import { Notice } from "../../components/Notice";

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8; /* Shadcn background color */
`;

const Main = styled.main`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadcn shadow */
`;

const Login = () => {
  return (
    <CenteredDiv>
      <Main>
        <Network></Network>
        {/* <Inspect></Inspect> */}
        <Report></Report>
        <Notice></Notice>
      </Main>
    </CenteredDiv>
  );
};

export default Login;
