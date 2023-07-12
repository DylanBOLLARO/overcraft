import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../settings/components/Layout";
import { ipcRenderer } from "electron";
import BasicTable from "./components/BasicTable";
import { Button, TextField } from "@mui/material";
import dataToExport from "../../functions/dataToExport";

function ViewAndChange() {
  const router = useRouter();
  const { query } = useRouter();
  let parsedData: any;

  try {
    parsedData = JSON.parse(query.buildData as any);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  interface interfaceLocalBuildOrder {
    timer: number | null;
    population: number | null;
    description: string | null;
    build_order_id: any;
  }

  const [dataAdded, setDataAdded] = useState(false);
  const [data, setData] = useState([]);
  const [localBuildOrder, setLocalBuildOrder] =
    useState<interfaceLocalBuildOrder>({
      timer: null,
      population: null,
      description: null,
      build_order_id: query.id,
    });

  const updateLocalBuild = (field: any, value: any) => {
    setLocalBuildOrder((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  function checkObjectProperties(obj: any) {
    for (let key in obj) {
      if (obj[key] !== null) {
        return true;
      }
    }
    return false;
  }

  const handleDataAdded = () => {
    console.log("handleDataAdded");
    setDataAdded(true);
  };

  useEffect(() => {
    console.log("buildData : " + JSON.stringify(query.test));

    (async () => {
      try {
        const newData = await ipcRenderer.invoke(
          "db-query",
          `SELECT * FROM etapes WHERE build_order_id=${query.test};`
        );
        if (data !== newData) {
          setData(newData);
          console.log("data : " + JSON.stringify(newData));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleFormSubmit = async () => {
    try {
      await ipcRenderer.invoke("add-line-build-order-to-db", {
        timer: parseInt(localBuildOrder.timer as any),
        population: parseInt(localBuildOrder.population as any),
        content: localBuildOrder.description,
        build_order_id: parseInt(query.test as any),
      });
      console.log("localBuildOrder : " + JSON.stringify(localBuildOrder));
      handleDataAdded();
    } catch (error) {
      console.error(error);
    }
    updateLineOfBuild();
  };

  useEffect(() => {
    ipcRenderer.on("data-line-added", handleDataAdded);
    return () => {
      ipcRenderer.off("data-line-added", handleDataAdded);
    };
  }, []);

  const updateLineOfBuild = () => {
    (async () => {
      try {
        const newData = await ipcRenderer.invoke(
          "db-query",
          `SELECT * FROM etapes WHERE build_order_id=${query.test};`
        );
        setData(newData);
        console.log("data : " + JSON.stringify(newData));
      } catch (error) {
        console.error(error);
      }
    })();
  };

  useEffect(() => {
    updateLineOfBuild();
    console.log("data : " + JSON.stringify(data));
  }, [dataAdded]);

  return (
    <div className="m-0 p-0">
      <Layout>
        <div className="m-5 flex flex-col gap-5">
          <div className="flex flex-row justify-between">
            <Button
              sx={{ width: "200px" }}
              variant="outlined"
              onClick={() => {
                router.push({
                  pathname: "/settings/Show",
                });
              }}
            >
              Back
            </Button>
            <div className="flex gap-5">
              <Button
                sx={{ width: "200px" }}
                color="error"
                variant="outlined"
                onClick={() => {
                  (async () => {
                    try {
                      const newData = await ipcRenderer.invoke(
                        "db-query",
                        `DELETE FROM build_order WHERE id = ${query.test};`
                      );
                      if (data !== newData) {
                        setData(newData);
                        console.log("data : " + JSON.stringify(newData));
                      }
                    } catch (error) {
                      console.error(error);
                    }
                  })();
                  router.push({
                    pathname: "/settings/Show",
                  });
                }}
              >
                Delete
              </Button>
              <Button
                sx={{ width: "200px" }}
                variant="outlined"
                color="success"
                onClick={() => {
                  dataToExport(
                    query.name,
                    data,
                    parsedData.playrace,
                    parsedData.versusrace
                  );
                }}
              >
                Export
              </Button>
            </div>
          </div>
          <BasicTable data={data} local={localBuildOrder} />
          <div className="flex flex-row justify-between">
            <TextField
              id="Description-basic"
              label="Description"
              variant="outlined"
              onChange={(e) => {
                updateLocalBuild("description", e.target.value);
              }}
            />
            <TextField
              id="Population-basic"
              label="Population"
              variant="outlined"
              onChange={(e) => {
                updateLocalBuild("population", e.target.value);
              }}
            />
            <TextField
              id="Timer-basic"
              label="Timer"
              variant="outlined"
              onChange={(e) => {
                updateLocalBuild("timer", e.target.value);
              }}
            />

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleFormSubmit}
            >
              Save line
            </Button>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ViewAndChange;
