import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    BsPlusCircle,
    BsThreeDotsVertical,
    BsPencilSquare,
    BsTrash,
} from "react-icons/bs";
import {
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import {ICities} from "../../commons/interfaces.ts";
import CitiesService from "../../services/CitiesService.ts";

export function CitiesListPage() {
    const [data, setData] = useState<ICities[]>([]);
    const [apiError, setApiError] = useState("");
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        CitiesService.findAll()
            .then((response) => {
                setData(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a lista de cidades");
            });
    };

    const onEdit = (path: string) => {
        navigate(path);
    };

    const onRemove = (id: number) => {
        CitiesService.remove(id)
            .then(() => {
                setShowDeleteMessage(true);
                loadData();
                setTimeout(() => {
                    setShowDeleteMessage(false);
                }, 1500);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao remover a cidade");
            });
    };

    return (
        <>
            <div className="container">
                <h1 className="fs-2 mb-4 text-center">Lista de Cidades</h1>
                <div className="text-center">
                    <Link
                        className="btn btn-success btn-icon mb-3"
                        to="/cadastro/cidades"
                        title="Nova cidade"
                        style={{ display: "inline-block" }}
                    >
                        <BsPlusCircle style={{ display: "inline-block" }} /> Nova Cidade
                    </Link>
                </div>
                <TableContainer>
                    <Table>
                        <TableCaption>Lista de cidades cadastradas</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Nome</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((cit: ICities) => (
                                <Tr
                                    key={cit.id}
                                    _hover={{ cursor: "pointer", background: "#eee" }}
                                >
                                    <Td>{cit.id}</Td>
                                    <Td>{cit.city}</Td>
                                    <Td>
                                        <Menu>
                                            <MenuButton
                                                as={IconButton}
                                                aria-label="Actions"
                                                icon={<BsThreeDotsVertical size={20} />}
                                                variant="ghost"
                                            />
                                            <MenuList>
                                                <MenuItem
                                                    icon={<BsPencilSquare />}
                                                    onClick={() => onEdit(`/cadastro/cidades/${cit.id}`)}
                                                >
                                                    Editar
                                                </MenuItem>
                                                <MenuItem
                                                    icon={<BsTrash />}
                                                    onClick={() => onRemove(cit.id!)}
                                                >
                                                    Remover
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                {apiError && <div className="alert alert-danger">{apiError}</div>}
                {showDeleteMessage && <div className="alert alert-success">Cidade removida com sucesso!</div>}
            </div>
        </>
    );
}
