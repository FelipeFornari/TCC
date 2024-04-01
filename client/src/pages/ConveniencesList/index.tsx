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
import {IConvenience} from "../../commons/interfaces.ts";
import ConvenienceService from "../../services/ConvenienceService.ts";

export function ConvenienceListPage() {
    const [data, setData] = useState<IConvenience[]>([]);
    const [apiError, setApiError] = useState("");
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        ConvenienceService.findAll()
            .then((response) => {
                setData(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a lista de comodidades");
            });
    };

    const onEdit = (path: string) => {
        navigate(path);
    };

    const onRemove = (id: number) => {
        ConvenienceService.remove(id)
            .then(() => {
                setShowDeleteMessage(true);
                loadData();
                setTimeout(() => {
                    setShowDeleteMessage(false);
                }, 1500);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao remover a comodidade");
            });
    };

    return (
        <>
            <div className="container">
                <h1 className="fs-2 mb-4 text-center">Lista de Responsáveis</h1>
                <div className="text-center">
                    <Link
                        className="btn btn-success btn-icon mb-3"
                        to="/cadastro/comodidades"
                        title="Nova Comodidade"
                        style={{ display: "inline-block" }}
                    >
                        <BsPlusCircle style={{ display: "inline-block" }} /> Nova Comodidade
                    </Link>
                </div>
                <TableContainer>
                    <Table>
                        <TableCaption>Lista de comodidades cadastradas</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Descrição</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((convenience: IConvenience) => (
                                <Tr
                                    key={convenience.id}
                                    _hover={{ cursor: "pointer", background: "#eee" }}
                                >
                                    <Td>{convenience.id}</Td>
                                    <Td>{convenience.description}</Td>
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
                                                    onClick={() => onEdit(`/cadastro/comodidades/${convenience.id}`)}
                                                >
                                                    Editar
                                                </MenuItem>
                                                <MenuItem
                                                    icon={<BsTrash />}
                                                    onClick={() => onRemove(convenience.id!)}
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
                {showDeleteMessage && <div className="alert alert-success">Comodidade removida com sucesso!</div>}
            </div>
        </>
    );
}
