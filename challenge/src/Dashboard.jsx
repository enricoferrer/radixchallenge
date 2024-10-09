import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [dadosJSON, setDadosJSON] = useState([]); // Estado para armazenar os dados do JSON

  useEffect(() => {
    const caminhoDoArquivo = "/equipment.JSON";

    fetch(caminhoDoArquivo)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar o arquivo JSON");
        }
        return response.json();
      })
      .then((dados) => {
        console.log(dados);
        setDadosJSON(dados); // Armazenar os dados no estado
      })
      .catch((err) => {
        console.error("Erro ao ler o arquivo JSON:", err);
      });
  }, []);

  async function enviarDadosParaGraphQL() {
    const requestBody = {
      query: `
            mutation CreateEquipment($input: [EquipmentInput]!) {
                createEquipment(input: $input) {
                    equipmentId
                    timestamp
                    value
                }
            }           
        `,
      variables: {
        input: dadosJSON, // Usar os dados do estado
      },
    };

    const inserirEquipamento = await fetch("http://localhost:9000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (inserirEquipamento.ok) {
      alert("Inserção realizada com sucesso!");
    } else {
      alert("Erro ao realizar a inserção.");
    }
  }

  return (
    <div>
      <button onClick={enviarDadosParaGraphQL}>Enviar Dados</button>
    </div>
  );
};

export default Dashboard;