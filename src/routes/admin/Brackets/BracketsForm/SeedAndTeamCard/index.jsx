import { Col } from "reactstrap";
import { Card } from "antd";
import { useState } from "react";

import { AddCircle, ProfileRemove } from "iconsax-react";
import SeedAndCardModal from "./SeedAndCardModal";

import "./styles.scss";

export default function SeedAndTeamCard({
  values,
  setRelationBracket,
  relationBracket,
  teamsOptions,
}) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const { Meta } = Card;

  return (
    <Col md="12" lg="12" xl="12" className="select-team">
      <SeedAndCardModal
        open={open}
        setOpen={setOpen}
        values={values}
        teamsOptions={teamsOptions}
        setRelationBracket={setRelationBracket}
        relationBracket={relationBracket}
        action={action}
      />

      <h4>Relacionar equipes às chaves:</h4>
      <div className="select-seed-container">
        {values?.seeds?.map((seed) => (
          <Card
            className="seed-team-card"
            actions={[
              seed?.teams?.length >= 2 ? (
                "Chave cheia"
              ) : (
                <div
                  className="add-team"
                  onClick={() =>
                    setRelationBracket({
                      ...relationBracket,
                      seedId: seed.id,
                    })
                  }
                >
                  <AddCircle
                    onClick={() => {
                      setAction("add");
                      setOpen(true);
                    }}
                    size="25"
                    color="#37d67a"
                  />
                </div>
              ),

              <ProfileRemove
                onClick={() => {
                  setAction("remove");
                  setOpen(true);
                  setRelationBracket({
                    ...relationBracket,
                    seedId: seed.id,
                  });
                }}
                size="25"
                color="#f47373"
              />,
            ]}
          >
            <Meta title={seed.id} />

            {seed?.teams?.map((team) => (
              <div>
                <span>{team.name}</span>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </Col>
  );
}
