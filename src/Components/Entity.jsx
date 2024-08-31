// eslint-disable-next-line no-unused-vars
import React from "react";
import { Tag, Tooltip } from "@chakra-ui/react";

const Entity = ({ text, entityType }) => {
  return (
    <>
      <Tooltip display="inline" label={entityType}>
        <Tag display="inline" fontWeight="bold">
          {text}
        </Tag>
      </Tooltip>
    </>
  );
};

export default Entity;
