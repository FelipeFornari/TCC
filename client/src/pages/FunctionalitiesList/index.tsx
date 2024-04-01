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
import {IFunctionality} from "../../commons/interfaces.ts";
import FunctionalitiesService from "../../services/FunctionalityService.ts";

export function FunctionalitiesListPage() {
    const [data, setData] = useState<IFunctionality[]>([]);
    const [apiError, setApiError] = useState("");
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        FunctionalitiesService.findAll()
            .then((response) => {
                setData(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a lista de funcionalidades");
            });
    };

    const onEdit = (path: string) => {
        navigate(path);
    };

    const onRemove = (id: number) => {
        FunctionalitiesService.remove(id)
            .then(() => {
                setShowDeleteMessage(true);
                loadData();
                setTimeout(() => {
                    setShowDeleteMessage(false);
                }, 1500);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao remover a funcionalidade");
            });
    };

    return (
        <>
            <div className="container">
                <h1 className="fs-2 mb-4 text-center">Lista de Funcionalidades</h1>
                <div className="text-center">
                    <Link
                        className="btn btn-success btn-icon mb-3"
                        to="/cadastro/funcionalidades"
                        title="Novo Local"
                        style={{ display: "inline-block" }}
                    >
                        <BsPlusCircle style={{ display: "inline-block" }} /> Nova Funcionalidade
                    </Link>
                </div>
                <TableContainer>
                    <Table>
                        <TableCaption>Lista de funcionalidades cadastradas</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Descrição</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((func: IFunctionality) => (
                                <Tr
                                    key={func.id}
                                    _hover={{ cursor: "pointer", background: "#eee" }}
                                >
                                    <Td>{func.id}</Td>
                                    <Td>{func.description}</Td>
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
                                                    onClick={() => onEdit(`/cadastro/funcionalidades/${func.id}`)}
                                                >
                                                    Editar
                                                </MenuItem>
                                                <MenuItem
                                                    icon={<BsTrash />}
                                                    onClick={() => onRemove(func.id!)}
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
                {showDeleteMessage && <div className="alert alert-success">Funcionalidade removida com sucesso!</div>}
            </div>
        </>
    );
}
