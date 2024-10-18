import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "./Dashboard.css"
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import Sidebar from './Sidebar.jsx'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // Constantes do useState (react)
  const [dadosJSON, setDadosJSON] = useState([]); 
  const [dadosCSV, setDadosCSV] = useState([])
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
        {
            label: '',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
        },
    ],
});
  const navigate = useNavigate();
  let dataHora;

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

  async function gerarGraficos() {
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
                timestamp_gte: dataHora,
            },
        },
    };

    try {
        const resposta = await fetch("http://localhost:9000/graphql", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!resposta.ok) {
            alert("Erro ao buscar dados.");
            return;
        }

        const resultado = await resposta.json();
        console.log("Dados recebidos:", resultado);

        const dados = resultado?.data?.getEquipment24h;
        if (!dados || dados.length === 0) {
            console.error("Nenhum dado disponível para processar.");
            return;
        }

        // Agrupar os dados com seus respectivos valores
        const equipamentos = {};
        dados.forEach((item) => {
            if (!equipamentos[item.equipmentId]) {
                equipamentos[item.equipmentId] = {
                    totalValue: 0,
                    count: 0,
                };
            }
            
            equipamentos[item.equipmentId].totalValue += item.value;
            equipamentos[item.equipmentId].count += 1;
        });

        // Descobrir a média por sensor com base no value e na quantidade de valores que cada equipamento possui
        const labels = Object.keys(equipamentos);
        const dataValues = Object.values(equipamentos).map((stats) =>
            (stats.totalValue / stats.count).toFixed(2)
        );

        if (labels.length === 0 || dataValues.length === 0) {
            console.error("Erro ao processar labels ou valores.");
            return;
        }

        
        const datasets = [{
            label: 'Média de Pressão por Equipamento',
            data: dataValues, 
            backgroundColor: labels.map(() =>
                `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`
            ), 
            borderColor: labels.map(() =>
                `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`
            ),
            borderWidth: 1,
        }];

        console.log("Dados do gráfico (médias em barra):", datasets);

        // Atualiza o estado do gráfico
        setChartData({
            labels, 
            datasets,
        });
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}

  function voltar() {
    alert("Logging out...")
    setTimeout(() => {
      navigate('/');
    }, 200);
  }

  const handleButtonClick = (tipo) => {
    if (tipo === "24horas") {
      dataHora = "2023-02-14T01:30:00.000-05:00";
      gerarGraficos();
    } else if (tipo === "48horas") {
      dataHora = "2023-02-13T01:30:00.000-05:00"
      gerarGraficos();
    } else if(tipo === "1semana"){
      dataHora = "2023-02-08T01:30:00.000-05:00"
      gerarGraficos();
    } else if(tipo === "1mes"){
      dataHora = "2023-01-15T01:30:00.000-05:00"
      gerarGraficos();
    } else {
      voltar();
    }
  };
  return (
    <div className="ContainerTudo">
      <Sidebar onButtonClick={handleButtonClick}/>
      <div className="Container">
        <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
      </div>
      <div className="Botoes">
        <input type="file" accept=".csv" onChange={lerArquivoCSV} />
        <button onClick={enviarDadosParaGraphQL}>Enviar Dados</button>
        <button onClick={enviarCSVParaGraphQL}>Enviar CSV</button>
      </div>
    </div>
  );
};

export default Dashboard;
