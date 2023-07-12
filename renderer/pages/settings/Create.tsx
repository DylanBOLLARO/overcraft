import { useState, useEffect } from "react";
import { ipcRenderer } from "electron";
import { useRouter } from "next/router";
import Layout from "../settings/components/Layout";
import { Box, Button, TextField } from "@mui/material";
import ToggleButtons from "../settings/components/ToggleButtons";

const CreateNewBuildOrder = () => {
  const router = useRouter();
  const [racePlay, setRacePlay] = useState("");
  const [dataAdded, setDataAdded] = useState(false);
  const [raceVersus, setRaceVersus] = useState("");
  const [localBuild, setLocalBuild] = useState({
    title: "",
    playrace: "",
    versusrace: "",
  });

  useEffect(() => {
    // updateLineOfBuild();
  }, [dataAdded]);

  // const updateLineOfBuild = () => {
  //   (async () => {
  //     try {
  //       const newData = await ipcRenderer.invoke(
  //         "db-query",
  //         `SELECT * FROM etapes WHERE build_order_id=${query.test};`
  //       );
  //       // setData(newData);
  //       console.log("data : " + JSON.stringify(newData));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // };

  const handleDataAdded = () => {
    console.log("handleDataAdded");
    setDataAdded(true);
  };

  const checkingFieldsOfBuild = (localBuild: any) => {
    if (localBuild.title === "" || localBuild.category === "") {
      return false;
    } else {
      return true;
    }
  };

  const handleRacePlay = (event: any, newAlignment: any) => {
    setRacePlay(newAlignment);
    updateLocalBuild("playrace", newAlignment);
  };

  const handleRaceVersus = (event: any, newAlignment: any) => {
    setRaceVersus(newAlignment);
    updateLocalBuild("versusrace", newAlignment);
  };

  const updateLocalBuild = (field: any, value: any) => {
    setLocalBuild((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleFormSubmit = async () => {
    if (checkingFieldsOfBuild(localBuild)) {
      try {
        await ipcRenderer.invoke("add-data-to-db", {
          title: localBuild.title,
          playrace: localBuild.playrace,
          versusrace: localBuild.versusrace,
        });

        updateLocalBuild("title", "");

        handleDataAdded();
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    console.log(localBuild);
  }, [localBuild]);

  return (
    <Layout title={"Create new build order"}>
      <div className="flex w-full flex-col items-center gap-5 px-10 py-5 text-xl">
        <div className="flex flex-row items-center gap-5 text-zinc-300">
          <Box component="div" sx={{ fontSize: 32, width: "250px" }}>
            Race play :
          </Box>
          <ToggleButtons handleAlignment={handleRacePlay} value={racePlay} />
        </div>
        <div className="flex flex-row items-center gap-5 text-zinc-300">
          <Box component="div" sx={{ fontSize: 32, width: "250px" }}>
            Race versus :
          </Box>
          <ToggleButtons
            handleAlignment={handleRaceVersus}
            value={raceVersus}
          />
        </div>
        <div className="flex w-full justify-between gap-5">
          <TextField
            sx={{ width: "70%" }}
            id="outlined-basic"
            label="Name of your build order"
            variant="outlined"
            onChange={(e) => updateLocalBuild("title", e.target.value)}
            value={localBuild.title}
          />
          <Button
            variant="outlined"
            onClick={handleFormSubmit}
            sx={{ width: "30%" }}
          >
            Insert build
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CreateNewBuildOrder;
