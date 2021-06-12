import React,{useContext} from 'react'
import {CarritoContext} from "../context/carritoContext"
import {useForm} from "react-hook-form"
import {MapContainer, TileLayer} from "react-leaflet"

function ComprarView() {

  const {carrito} = useContext(CarritoContext)
  const { register, handleSubmit, formState: { errors } } = useForm();

  const recibirSubmit = (datos) => {
    console.log(datos)
    //hacer una petición demas
  }

  return (
    <div className="container mt-4">
      <h1>Realizar compra</h1>
      <p>
        Por favor verifique los productos e indique los datos solicitados.
      </p>
      <div className="row">
        {/* carrito */}
        <div className="col-12 col-lg-6">
          <h4>Productos del carrito</h4>
          <ul className="list-group">
            {carrito.map((prod,i) => (
              <li className="list-group-item d-flex justify-content-between" key={i}>
                <div className="me-auto">
                  <span className="fw-bold">{prod.nombre}</span>
                  <br/>
                  <small>Cantidad: {prod.cantidad}</small>
                </div>
                <span className="badge bg-dark rounded-pill p-3">
                  S/ {prod.cantidad * prod.precio}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* form */}
        <div className="col-12 col-lg-6">
          <h4>Datos del Comprador</h4>
          <form onSubmit={handleSubmit(recibirSubmit)}>
            <div className="mb-2">
              <label className="form-label">
                Nombres y Apellidos:
              </label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Ej. Juan Perez" 
                // {...register(<nombre_input>, {validaciones})}
                {...register("nombre", {required:true})}
              />
              {/* las va a validar y me mostrará un error */}
              {errors.nombre && <span className="text-danger">Este campo es obligatorio</span>}
            </div>

            <div className="mb-2">
              <label className="form-label">
                Número de Celular
              </label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="987632788" 
                {...register("numero",{minLength:9})}
              />
              {errors.numero && <span className="text-danger">Longitud mínima de 9 dígitos</span>}
            </div>

            <div className="mb-2">
              <label className="form-label">
                Ciudad
              </label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Ej. Arequipa" 
                {...register("ciudad",{pattern:/^[A-Za-z]/i})}
              />
              {errors.ciudad && <span className="text-danger">Solamente Letras</span>}
            </div>
            
            <MapContainer center={[-16,-71]} zoom={17} >

            </MapContainer>
            
            <button type="submit" className="btn btn-dark">
              Confirmar Compra
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ComprarView
