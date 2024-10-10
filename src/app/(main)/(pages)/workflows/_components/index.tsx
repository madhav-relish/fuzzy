import React from "react";
import Workflow from "./workflow";

type Props = {};

const Workflows = (props: Props) => {
  return (
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col m-2">
        <Workflow
          description="Test workflow"
          id="625362462"
          name="Test workflow"
          publish={false}
        />
      </section>
    </div>
  );
};

export default Workflows;
