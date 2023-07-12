import { ipcRenderer } from "electron";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import BasicSelect from "./components/BasicSelect";
import ActionAreaCardBuild from "./components/ActionAreaCardBuild";

function Show() {
  const router = useRouter();
  const { query } = useRouter();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [targetId, setTargetId] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const [data, setData] = useState([]);
  const [dataAdded, setDataAdded] = useState(false);

  const [raceBuildDisplayed, setRaceBuildDisplayed] = useState(3);

  const handleDataAdded = () => {
    console.log("handleDataAdded");
    setDataAdded(true);
  };

  const getDataFromDb = async () => {
    try {
      const newData = await ipcRenderer.invoke(
        "db-query",
        "SELECT * FROM build_order;"
      );
      if (data !== newData) {
        setData(newData);
        console.log("data : " + JSON.stringify(newData));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataFromDb();

    if (dataAdded) {
      setDataAdded(false);
    }
  }, [dataAdded]);

  useEffect(() => {
    console.log("raceBuildDisplayed : " + JSON.stringify(raceBuildDisplayed));
  }, [raceBuildDisplayed]);

  useEffect(() => {
    ipcRenderer.on("data-added", handleDataAdded);
    return () => {
      ipcRenderer.off("data-added", handleDataAdded);
    };
  }, []);

  return (
    <Layout>
      <div className="m-8 flex items-center justify-center gap-5 font-mono text-2xl font-bold text-zinc-300">
        <BasicSelect
          raceBuildDisplayed={raceBuildDisplayed}
          setRaceBuildDisplayed={setRaceBuildDisplayed}
        />
        {/* <p>VS</p> */}
        {/* <BasicSelect
          raceBuildDisplayed={raceBuildDisplayed}
          setRaceBuildDisplayed={setRaceBuildDisplayed}
        /> */}
      </div>
      <div className="m-3 flex flex-wrap justify-center gap-5">
        {data?.filter((race: any) => {
          if (raceBuildDisplayed === 3) {
            return true;
          }
          return race.playrace == raceBuildDisplayed;
        }).length === 0 && (
          <p className="text-2xl text-zinc-300">There is no build order</p>
        )}

        {data?.filter((race: any) => {
          if (raceBuildDisplayed === 3) {
            return true;
          }
          return race.playrace == raceBuildDisplayed;
        }).length !== 0 &&
          data
            ?.filter((race: any) => {
              if (raceBuildDisplayed === 3) {
                return true;
              }
              return race.playrace == raceBuildDisplayed;
            })
            .map((build: any, index: number) => (
              <ActionAreaCardBuild key={index} buildData={build} />
            ))}
      </div>
    </Layout>
  );
}

export default Show;
