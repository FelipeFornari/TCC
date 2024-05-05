import { NavLink } from "react-router-dom";
import AuthService from "../../services/AuthService.ts";
import Dropdown from 'react-bootstrap/Dropdown';

export function NavBar() {
  const onClickLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <div className="bg-white shadow-sm mb-2">
      <div className="container">
        <nav className="navbar navbar-light navbar-expand">
          {/*<Link to="/" className="navbar-brand">*/}
          {/*  <img src={logo} width="60" alt="UTFPR" />*/}
          {/*</Link>*/}
          <ul className="navbar-nav me-auto mb-2 mb-md-0">

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

            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Comodidades
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <li className="nav-item">
                  <NavLink
                      to="/cadastro/comodidades"
                      className={(navData) =>
                          navData.isActive ? "nav-link active" : "nav-link"
                      }
                  >
                    Cadastrar Comodidades
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                      to="/cadastro/comodidades/list"
                      className={(navData) =>
                          navData.isActive ? "nav-link active" : "nav-link"
                      }
                  >
                    Editar/Excluir Comodidades
                  </NavLink>
                </li>
              </Dropdown.Menu>
            </Dropdown>



            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Locais
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <li className="nav-item">
                  <NavLink
                      to="/cadastro/locais"
                      className={(navData) =>
                          navData.isActive ? "nav-link active" : "nav-link"
                      }
                  >
                    Cadastrar locais
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                      to="/cadastro/locais/list"
                      className={(navData) =>
                          navData.isActive ? "nav-link active" : "nav-link"
                      }
                  >
                    Editar/Excluir locais
                  </NavLink>
                </li>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Funcionalidades
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <li className="nav-item">
                  <NavLink
                      to="/cadastro/funcionalidades"
                      className={(navData) =>
                          navData.isActive ? "nav-link active" : "nav-link"
                      }
                  >
                    Cadastrar funcionalidades
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                      to="/cadastro/funcionalidades/list"
                      className={(navData) =>
                          navData.isActive ? "nav-link active" : "nav-link"
                      }
                  >
                    Editar/Excluir funcionalidades
                  </NavLink>
                </li>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Responsáveis
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <li className="nav-item">
                  <NavLink
                      to="/cadastro/responsaveis"
                      className={(navData) =>
                          navData.isActive ? "nav-link active" : "nav-link"
                      }
                  >
                    Cadastrar responsáveis
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                      to="/cadastro/responsaveis/list"
                      className={(navData) =>
                          navData.isActive ? "nav-link active" : "nav-link"
                      }
                  >
                    Editar/Excluir responsáveis
                  </NavLink>
                </li>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Cidades
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <li className="nav-item">
                  <NavLink
                      to="/cadastro/cidades"
                      className={(navData) =>
                          navData.isActive ? "nav-link active" : "nav-link"
                      }
                  >
                    Cadastrar cidades
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                      to="/cadastro/cidades/list"
                      className={(navData) =>
                          navData.isActive ? "nav-link active" : "nav-link"
                      }
                  >
                    Editar/Excluir cidades
                  </NavLink>
                </li>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Atrativos
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <li className="nav-item">
                  <NavLink
                      to="/cadastro/atrativos"
                      className={(navData) =>
                          navData.isActive ? "nav-link active" : "nav-link"
                      }
                  >
                    Cadastrar atrativos
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                      to="/cadastro/atrativos/list"
                      className={(navData) =>
                          navData.isActive ? "nav-link active" : "nav-link"
                      }
                  >
                    Editar/Excluir atrativos
                  </NavLink>
                </li>
              </Dropdown.Menu>
            </Dropdown>

            <li className="nav-item">
              <button className="btn btn-light"
                      onClick={onClickLogout}>
                &times; Sair
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
