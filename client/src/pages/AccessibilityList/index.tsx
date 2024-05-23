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
import {IAccessibility} from "../../commons/interfaces.ts";
import AccessibilitiesService from "../../services/AccessibilitiesService.ts";
import accessibilitiesService from "../../services/AccessibilitiesService.ts";

export function AccessibilitiesListPage() {
    const [data, setData] = useState<IAccessibility[]>([]);
    const [apiError, setApiError] = useState("");
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        AccessibilitiesService.findAll()
            .then((response) => {
                setData(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a lista de acessibilidade");
            });
    };

    const onEdit = (path: string) => {
        navigate(path);
    };

    const onRemove = (id: number) => {
        accessibilitiesService.remove(id)
            .then(() => {
                setShowDeleteMessage(true);
                loadData();
                setTimeout(() => {
                    setShowDeleteMessage(false);
                }, 1500);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao remover a acessibilidade");
            });
    };

    return (
        <>
            <div className="container">
                <h1 className="fs-2 mb-4 text-center">Lista de Acessibilidades</h1>
                <div className="text-center">
                    <Link
                        className="btn btn-success btn-icon mb-3"
                        to="/cadastro/acessibilidades"
                        title="Nova acessibilidade"
                        style={{ display: "inline-block" }}
                    >
                        <BsPlusCircle style={{ display: "inline-block" }} /> Nova Acessibilidade
                    </Link>
                </div>
                <TableContainer>
                    <Table>
                        <TableCaption>Lista de acessibilidades cadastradas</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Tipo</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((accessibility: IAccessibility) => (
                                <Tr
                                    key={accessibility.id}
                                    _hover={{ cursor: "pointer", background: "#eee" }}
                                >
                                    <Td>{accessibility.id}</Td>
                                    <Td>{accessibility.type}</Td>
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
                                                    onClick={() => onEdit(`/cadastro/acessibilidade/${accessibility.id}`)}
                                                >
                                                    Editar
                                                </MenuItem>
                                                <MenuItem
                                                    icon={<BsTrash />}
                                                    onClick={() => onRemove(accessibility.id!)}
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
