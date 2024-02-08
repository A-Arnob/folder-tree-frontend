import axios, { CanceledError } from "axios";
import { useState, useEffect } from "react";

interface Folder {
  _id: string;
  name: string;
  parent: string;
}

const FetchChild = (parent: string) => {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<Folder[]>(`http://localhost:8080/folders/${parent}`, {
        // params: parent,
        signal: controller.signal,
      })
      .then((res) => {
        setFolders(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
      });

    return () => controller.abort();
  }, []);

  return folders;
};

export default FetchChild;
