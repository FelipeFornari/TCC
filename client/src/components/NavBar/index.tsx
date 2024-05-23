import { NavLink } from "react-router-dom";
import AuthService from "../../services/AuthService.ts";
import Dropdown from 'react-bootstrap/Dropdown';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Button} from "@chakra-ui/react";

export function NavBar() {
  const onClickLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
      <div className="bg-white shadow-sm mb-2">
        <div className="container">
          <nav className="navbar navbar-light navbar-expand">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <Row>
                <Col>
                  <li className="nav-item">
                    <NavLink
                        to="/"
                        className={(navData) =>
                            navData.isActive ? "nav-link active" : "nav-link"
                        }
                    >
                      Home
                    </NavLink>
                  </li>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      Cadastrar
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <li className="nav-item">
                        <NavLink
                            to="/cadastro/acessibilidades"
                            className={(navData) =>
                                navData.isActive ? "nav-link active" : "nav-link"
                            }
                        >
                          Acessibilidade
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                            to="/cadastro/atrativos"
                            className={(navData) =>
                                navData.isActive ? "nav-link active" : "nav-link"
                            }
                        >
                          Atrativos
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                            to="/cadastro/cidades"
                            className={(navData) =>
                                navData.isActive ? "nav-link active" : "nav-link"
                            }
                        >
                          Cidades
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                            to="/cadastro/comodidades"
                            className={(navData) =>
                                navData.isActive ? "nav-link active" : "nav-link"
                            }
                        >
                          Comodidades
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                            to="/cadastro/funcionalidades"
                            className={(navData) =>
                                navData.isActive ? "nav-link active" : "nav-link"
                            }
                        >
                          Funcionalidades
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                            to="/cadastro/locais"
                            className={(navData) =>
                                navData.isActive ? "nav-link active" : "nav-link"
                            }
                        >
                          Locais
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                            to="/cadastro/responsaveis"
                            className={(navData) =>
                                navData.isActive ? "nav-link active" : "nav-link"
                            }
                        >
                          Responsáveis
                        </NavLink>
                      </li>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      Editar/Excluir
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <li className="nav-item">
                        <NavLink
                            to="/cadastro/acessibilidades/list"
                            className={(navData) =>
                                navData.isActive ? "nav-link active" : "nav-link"
                            }
                        >
                          Acessibilidade
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                            to="/cadastro/atrativos/list"
                            className={(navData) =>
                                navData.isActive ? "nav-link active" : "nav-link"
                            }
                        >
                          Atrativos
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                            to="/cadastro/cidades/list"
                            className={(navData) =>
                                navData.isActive ? "nav-link active" : "nav-link"
                            }
                        >
                          Cidades
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                            to="/cadastro/comodidades/list"
                            className={(navData) =>
                                navData.isActive ? "nav-link active" : "nav-link"
                            }
                        >
                          Comodidades
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                            to="/cadastro/funcionalidades/list"
                            className={(navData) =>
                                navData.isActive ? "nav-link active" : "nav-link"
                            }
                        >
                          Funcionalidades
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                            to="/cadastro/locais/list"
                            className={(navData) =>
                                navData.isActive ? "nav-link active" : "nav-link"
                            }
                        >
                          Locais
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                            to="/cadastro/responsaveis/list"
                            className={(navData) =>
                                navData.isActive ? "nav-link active" : "nav-link"
                            }
                        >
                          Responsáveis
                        </NavLink>
                      </li>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <li className="nav-item">
                    <Button className="btn btn-light"
                            onClick={onClickLogout}>
                      &times; Sair
                    </Button>
                  </li>
                </Col>
              </Row>
            </ul>
          </nav>
        </div>
      </div>
  );
}
