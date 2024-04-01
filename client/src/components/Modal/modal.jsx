import React from 'react'


const BACKGROUND_STYLE = {
  position: "fullScreen",
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  zIndex: 1000,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "#fff",
}

const MODAL_STYLE = {
  position: "absolute",
  top: "10%",
  width: "90%",
  background: "#fff",
  textAlign: "center",
  //transform: translateY("-50%"),
  padding: "2rem",
  borderRadius: "1px",
  //boxShadow: 0 0 1rem 0 #ccc,
  minHeight: "500px",
  display: "absolute",
  justifyContent: "center",
  alignItems: "center"
}

export default function Modal({ isOpen, setModalOpen, children }) {
  if (isOpen) {
    return (
        <div style={BACKGROUND_STYLE}>
          <div style={MODAL_STYLE}>
            <div style={{ cursor: 'pointer',}} onClick={setModalOpen}>
            </div>
            <div>{children}</div>
            <button onClick={setModalOpen}>Fechar</button>
          </div>
        </div>
    )
  }
  return null
}