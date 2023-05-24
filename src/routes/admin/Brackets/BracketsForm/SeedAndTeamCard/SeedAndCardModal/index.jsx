import React, { useState } from "react";
import { Modal } from "antd";
import Select from "react-select";
import SeedService from "../../../../../../services/seed.service";

export default function SeedAndCardModal({
  teamsOptions,
  setRelationBracket,
  relationBracket,
  open,
  setOpen,
}) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  async function handleConfirm() {
    setConfirmLoading(true);
    const _seedService = new SeedService();

    await _seedService
      .createRelationSeedsAndTeam({
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

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <Modal
      title="Adicionar time à chave"
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
