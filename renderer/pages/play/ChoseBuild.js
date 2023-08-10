import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import Layout from "./components/Layout";
import { colorName } from "../../constants/main";
import { TbSquareRounded, TbSquareRoundedFilled } from "react-icons/tb";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ProductScreen() {
  const userLogged = useSelector(
		(state) => state.userLogged.value
	);

  console.log(userLogged);
  const { query } = useRouter();
  const router = useRouter();

  const [selectedBuild, setSelectedBuild] = useState(0);

  const incCounter = () => {
    setSelectedBuild((prevCounter) => prevCounter + 1);
  };

  const decCounter = () => {
    setSelectedBuild((prevCounter) => prevCounter - 1);
  };

  const [data, setData] = useState([]);
	const [first, setfirst] = useState("");

useEffect(() => {
  ipcRenderer.send("send-variable-to-main", 156328);

  ipcRenderer.on("variable-value-from-main", (event, variableValue) => {
    setfirst(variableValue);

 });
}, [first])


  useEffect(() => {

    (async () => {      
			try {
				const response = await axios.post(
					"http://127.0.0.1:3100/build-order/get-all-build",
					{
						id: "" + first,
					}
				);
        console.log(response.data);
				setData(response.data);
			} catch (error) {
				console.error(error);
			}
		})();


  }, [selectedBuild,first]);

  useEffect(() => {
    ipcRenderer.on("num7", () => {
      decCounter();
    });

    ipcRenderer.on("num8", async () => {
      const newData = await ipcRenderer.invoke(
        "db-query",
        `SELECT build_order.* FROM build_order JOIN categories ON build_order.category_id = categories.id WHERE categories.title = '${
          query.racePlayed + "v" + query.raceOpponent
        }';`
      );

      console.log("newData[selectedBuild].id : " + newData[selectedBuild].id);

      router.push({
        pathname: "/play/DisplayBuild",
        query: {
          racePlayed: query.racePlayed,
          raceOpponent: query.raceOpponent,

          build: newData[selectedBuild].id,
        },
      });
    });

    ipcRenderer.on("num9", () => {
      incCounter();
    });

    ipcRenderer.on("num5", async () => {
      router.push({
        pathname: "/play/OpponentRace",
        query: { racePlayed: query.racePlayed },
      });
    });

    return () => {
      ipcRenderer.removeAllListeners("num7");
      ipcRenderer.removeAllListeners("num8");
      ipcRenderer.removeAllListeners("num9");
      ipcRenderer.removeAllListeners("num5");
    };
  }, [selectedBuild]);

  return (
    <Layout title={`Select your build order`}>
      <div className="flex flex-col justify-between gap-2 overflow-hidden">
        {data &&
          data.map((race, index) => (
            <div
              key={race.name}
              className="flex w-full flex-row items-center justify-between bg-black/50 px-3 py-1 text-zinc-300"
            >
              <p className={`text-lg`}>{race.title}</p>

              {index === selectedBuild ? (
                <p className={`text-lg text-zinc-500`}>
                  <div className="relative">
                    <TbSquareRounded size={32} />
                    <div className="absolute -translate-y-6 translate-x-2 text-[#98c379]">
                      <TbSquareRoundedFilled size={16} />
                    </div>
                  </div>
                </p>
              ) : (
                <p className={`text-lg text-zinc-500`}>
                  <TbSquareRounded size={32} />
                </p>
              )}
            </div>
          ))}
      </div>
    </Layout>
  );
  4;
}