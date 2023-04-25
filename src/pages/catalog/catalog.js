import React, {useEffect, useState} from "react";
import Layout from "../../components/Layout/Layout";
import s from "./Catalog.module.scss"
import useMediaQuery from "../../app/hooks/useMediaQuery";

const Catalog = () => {
  const [movies, setMovies] = useState([])
  const isBiggerThanTablet = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    
  }, [])

  return (
    <Layout disableHeader={!isBiggerThanTablet}>
      <h1>Catalog</h1>

      <div>

      </div>
    </Layout>
  )
}

export default Catalog
