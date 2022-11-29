
import s from '../Home/Home.module.css';
import Search from '../../Components/SearBar/Search';
import NavBar from '../../Components/NavBar/NavBar';
import Card from '../../Components/Cards/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Paginado from '../../Components/Paginated/Paginado';
import fondoTabla from '../../images/fondoTabla.jpg'
import * as actions from '../../Redux/actions';
import reload from '../../images/reload.png';


export default function Home() {

  const dispatch = useDispatch()
  const allRecetas = useSelector((state) => state.recetas)
  const dietas = useSelector((state) => state.dietas);
  const [recetas, setRecetas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(actions.getDietas())
    dispatch(actions.getAllRecetas())
  }, [dispatch])


  useEffect(() => {
    setRecetas([...allRecetas])
  }, [allRecetas])



  const searchRecetas = (e) => {
    let search = e.target.value;
    let filter = [...allRecetas].filter((r) => r.nombre.toLowerCase().includes(search.toLowerCase()));
    setRecetas(filter)
    setPage(1)
    setCurrentPage(0)
  }

  const handleFilterApiOrDb = (e) => {
    let value = e.target.value;
    if (value === 'all') return setRecetas([...allRecetas]);
    if (value === 'db') {
      let db = [...recetas].filter((e) => e.created === true);
      if (db.length) {
        return setRecetas(db)
      } else {
        return setRecetas([...allRecetas].filter((e) => e.created === true))
      }
    }
    if (value === 'api') {

      let api = [...recetas].filter((e) => e.created === false)
      if (api.length) {
        return setRecetas(api)
      } else {
        return setRecetas([...allRecetas].filter((e) => e.created === false))
      }

    }
  }
  //Ordenar Alfabeticamente

  const handleSort = (e) => {
    const action = e.target.value;
    switch (action) {
      case 'all':
        setPage(1);
        setCurrentPage(0)
        return setRecetas([...allRecetas])
      case 'asc':
        console.log('asc');
        setPage(1);
        setCurrentPage(0)
        return setRecetas([...recetas].sort((a, b) => {
          if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1
          else return -1
        }))

      case 'desc':
        console.log('desc')
        setPage(1)
        setCurrentPage(0)
        return setRecetas([...recetas].sort((a, b) => {
          if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return 1
          else return -1
        }))
      default:
        setCurrentPage(0)
        setPage(1)
        setRecetas([...allRecetas]);
    }
  }

  //Filtrar por Dietas
  const filterByDiets = (e) => {
    let value = e.target.value;
    if (value === 'All') {
      setPage(1);
      setCurrentPage(0)
      setRecetas([...allRecetas])
    } else {
      setPage(1);
      setCurrentPage(0)
      let filtrado = [...recetas]?.filter((a) => {
        return a.Dietas?.find((e) => e.toLowerCase().includes(value.toLowerCase()))

      });
      if (!filtrado.length) {
        filtrado = allRecetas?.filter((e) => {
          return e.Dietas?.find((e) => e.toLowerCase().includes(value.toLowerCase()))
        })
      }
      setRecetas(filtrado)
    };
  }

  const filterHealthScore = (e) => {
    let value = e.target.value;
    if (value === "menor") {
      let result = [...recetas].sort((a, b) => {
        if (parseInt(a.health_score) > parseInt(b.health_score)) return 1;
        if (parseInt(a.health_score) < parseInt(b.health_score)) return -1;
        return 0;
      });
      setCurrentPage(0)
      setPage(1)
      return setRecetas(result);
    }
    else if (value === "mayor") {
      let result = [...recetas].sort((a, b) => {
        if (parseInt(a.health_score) < parseInt(b.health_score)) return 1;
        if (parseInt(a.health_score) > parseInt(b.health_score)) return -1;
        return 0;
      });
      setCurrentPage(0)
      setPage(1)
      return setRecetas(result);
    };
  }

  //Paginado, función cards por página

  const cardsByPage = () => {
    return [...recetas].slice(currentPage, currentPage + 9)
  }

  const nextPage = () => {
    if (recetas.length > currentPage + 9) {
      setPage(page + 1)
      setCurrentPage(currentPage + 9)
    }
  }
  const prevPage = () => {
    if (currentPage > 0) {
      setPage(page - 1)
      setCurrentPage(currentPage - 9)
    }
  }
  
  console.log(recetas);
  
  return (
    <div className={s.contenedorHome}>
      <NavBar />
      <div className={s.search}>

        <div className={s.contenedorFiltros}>
          Filtros:
          <img className={s.reload} src={reload} alt="Recargar"  onClick={() => {
            setRecetas(allRecetas)
            setCurrentPage(0)
            setPage(1)
          }} />

          <div className={s.items}>
            <select onChange={e => handleSort(e)} className='select'>
              <option selected disabled value={" "}>Ordenar por: ⏬</option>
              <option className='option' value='asc'>A-Z ⏬</option>
              <option className='option' value='desc'>Z-A ⏬</option>
            </select>
          </div>

          <div className={s.items}>
            <select name="" id="" onChange={(e) => handleFilterApiOrDb(e)} value={" "}>
              <option value="" disabled={true} selected={true}  >Api o DB</option>
              <option value="api">Api</option>
              <option value="db">Db</option>
            </select>
          </div>

          <div className={s.items}>
            <select name="filterByDiets" id="" onChange={(e) => filterByDiets(e)} value={" "}>
              <option defaultValue={""} selected={true} disabled={true} >Dietas</option>
              <option defaultValue={"all"}>All</option>
              {dietas.map((dieta) => {
                return (
                  <option value={dieta.name}>{dieta.name}</option>
                )
              })}
            </select>
          </div>
          <div className={s.items}>
            <select name="filterHealthScore" id="" onChange={(e) => filterHealthScore(e)} value={" "}>
              <option value="" selected={true} disabled={true}>Puntaje: </option>
              <option value="mayor">Mayor</option>
              <option value="menor">Menor</option>
            </select>

          </div>
          <div className={s.items}>
            <Search searchRecetas={searchRecetas} />
          </div>
        </div>

      </div>

      <div className={s.contenedorCards}>
        {cardsByPage().length ? cardsByPage()?.map((receta) => {
          return (
            <Card
              key={receta.id}
              id={receta.id}
              nombre={receta.nombre}
              imagen={receta.image}
              dietas={receta.Dietas}
              dietaDb={receta.Dieta?.filter((e) => e.name)}
            />
          )
        })
          :
          <h1 style={{ color: "white" }}>No se encontraron coincidencias</h1>
        }
      </div>

      <div className={s.paginated}>
        < Paginado prevPage={prevPage} nextPage={nextPage} currentPage={currentPage} page={page} />
        <></>
      </div>

    </div>
  )
}
