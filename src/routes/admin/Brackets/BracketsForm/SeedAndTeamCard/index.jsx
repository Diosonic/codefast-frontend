import { Col } from "reactstrap";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Popover, Skeleton, Switch } from "antd";
import { useState } from "react";
import Select from "react-select";

import "./styles.scss";
import { AddCircle } from "iconsax-react";
import SeedAndCardModal from "./SeedAndCardModal";

export default function SeedAndTeamCard({
  values,
  setRelationBracket,
  relationBracket,
  teamsOptions,
}) {
  const [open, setOpen] = useState(false);
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
                  <div onClick={() => setOpen(true)}>
                    <AddCircle size="25" color="#37d67a" />

                    <span>Adicionar</span>
                  </div>
                </div>
              ),
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

      <Col md="12" lg="12" xl="12" className="display-infos">
        <h5>
          Chave: {relationBracket?.seedId} <br />
          Equipe:
          {relationBracket?.team?.name}
        </h5>
      </Col>
    </Col>
  );
}
