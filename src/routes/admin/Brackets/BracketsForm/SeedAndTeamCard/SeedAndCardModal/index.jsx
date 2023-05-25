import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import Select from "react-select";
import SeedService from "../../../../../../services/seed.service";
import TeamService from "../../../../../../services/team.service";

export default function SeedAndCardModal({
  teamsOptions,
  setRelationBracket,
  relationBracket,
  open,
  setOpen,
  action,
}) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState();

  useEffect(() => {
    if (action === "add") {
      setModalText("Atribuir equipe à chave");
    } else {
      setModalText("Remover equipe da chave");
    }
  }, [action]);

  async function handleConfirm() {
    setConfirmLoading(true);
    const _seedService = new SeedService();

    if (action === "add") {
      await _seedService
        .createRelationSeedsAndTeam({
          seedId: relationBracket.seedId,
          teamId: relationBracket.team.id,
        })
        .then(async (res) => {
          setOpen(false);
          setConfirmLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (action === "remove") {
      await _seedService
        .removeRelationSeedsAndTeam({
          seedId: relationBracket.seedId,
          teamId: relationBracket.team.id,
        })
        .then((res) => {
          setOpen(false);
          setConfirmLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onOk={handleConfirm}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <p>{modalText}</p>

      <Select
        name="teams"
        options={teamsOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(ev) => {
          setRelationBracket({
            ...relationBracket,
            team: ev,
          });
        }}
      />
    </Modal>
  );
}
