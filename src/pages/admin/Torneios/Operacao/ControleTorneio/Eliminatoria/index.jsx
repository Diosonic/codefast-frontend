import { useEffect, useState, React } from "react";
import { useParams } from "react-router-dom";
import ControleEliminatoriaService from "../../../../../../services/controleEliminatoria.service";
import { Popconfirm } from "antd";

export default function ControleEliminatoria() {
  const { id } = useParams();
  const [equipesEliminatoria, setEquipesEliminatoria] = useState([]);

  const _controleEliminatoriaService = new ControleEliminatoriaService();

  useEffect(() => {
    async function init() {
      const responseControleEliminatoria =
        await _controleEliminatoriaService.GetAllEquipesCredenciadasEliminatoria(
          id
        );

      setEquipesEliminatoria(
        responseControleEliminatoria.controleEliminatoriaEquipes
      );
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleAlteraStatusValidacao(equipe) {
    await _controleEliminatoriaService.AlteraStatusValidacao({
      id: equipe.id,
      statusValidacao: "Validando",
    });
  }

  return (
    <div>
      <h1>Controle de eliminatória</h1>

      <hr />

      {equipesEliminatoria?.map((equipe) => (
        <Popconfirm
          title="Remover torneio"
          description={`Deseja remover o torneio"?`}
          onConfirm={() => handleAlteraStatusValidacao(equipe)}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <br />

            <h1>{equipe.equipe.nome}</h1>
            <p>{equipe.statusValidacao}</p>
          </div>
        </Popconfirm>
      ))}
    </div>
  );
}
