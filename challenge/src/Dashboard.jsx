import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "./Dashboard.css"

const Dashboard = () => {
  const [dadosJSON, setDadosJSON] = useState([]); 
  const [dadosCSV, setDadosCSV] = useState([])

  
  const lerArquivoCSV = (event) => {
    const arquivo = event.target.files[0];
    if (arquivo) {
      Papa.parse(arquivo, {
        header: true,
        skipEmptyLines: true,
        complete: (resultado) => {
          const dadosFormatados = resultado.data.map(item => ({
            equipmentId: item.equipmentId,
            timestamp: new Date(item.timestamp).toISOString(), 
            value: parseFloat(item.value),
          }));
  
          console.log("CSV lido com sucesso:", dadosFormatados);
          setDadosCSV(dadosFormatados); 
        },
      });
    }
  };

  useEffect(() => {
    console.log("Dados CSV atualizados:", dadosCSV);
  }, [dadosCSV]);

  async function enviarCSVParaGraphQL() {
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
        input: dadosCSV, 
      },
    };

    const inserirEquipamento = await fetch("http://localhost:9000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(dadosCSV)

    if (inserirEquipamento.ok) {
      alert("Inserção realizada com sucesso!");
    } else {
      alert("Erro ao realizar a inserção.");
    }
  }
  
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
        setDadosJSON(dados); 
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
        input: dadosJSON,
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

  async function gerarGrafico24hrs() {
    const dataHora = "2023-02-14T01:30:00.000-05:00"
    const requestBody = {
      query: `
      query($filter: timestampInput) {
        getEquipment24h(filter: $filter) {
          equipmentId
          timestamp
          value
        }
      }`,
      variables: {
        filter: {
          timestamp_gte: dataHora
        }
      }
    }
    console.log(JSON.stringify(requestBody, null, 2));
    try {
      const resposta = await fetch("http://localhost:9000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      if (resposta.ok) {
        const resultado = await resposta.json();
        console.log(resultado);
      } else {
        alert("Erro ao buscar dados.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
}

  return (
    <div className="ContainerTudo">
      <div className="Container">

      </div>
      <div className="Botoes">
        <input type="file" accept=".csv" onChange={lerArquivoCSV} />
        <button onClick={enviarDadosParaGraphQL}>Enviar Dados</button>
        <button onClick={enviarCSVParaGraphQL}>Enviar CSV</button>
        <button onClick={gerarGrafico24hrs}></button>
      </div>
    </div>
  );
};

export default Dashboard;
