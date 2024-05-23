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
import {IEntrusted} from "../../commons/interfaces.ts";
import EntrustedService from "../../services/EntrustedService.ts";

export function EntrustedListPage() {
    const [data, setData] = useState<IEntrusted[]>([]);
    const [apiError, setApiError] = useState("");
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        EntrustedService.findAll()
            .then((response) => {
                setData(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a lista de responsáveis");
            });
    };

    const onEdit = (path: string) => {
        navigate(path);
    };

    const onRemove = (id: number) => {
        EntrustedService.remove(id)
            .then(() => {
                setShowDeleteMessage(true);
                loadData();
                setTimeout(() => {
                    setShowDeleteMessage(false);
                }, 1500);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao remover o responsável");
            });
    };

    return (
        <>
            <div className="container">
                <h1 className="fs-2 mb-4 text-center">Lista de Responsáveis</h1>
                <div className="text-center">
                    <Link
                        className="btn btn-success btn-icon mb-3"
                        to="/cadastro/responsaveis"
                        title="Novo Responsável"
                        style={{ display: "inline-block" }}
                    >
                        <BsPlusCircle style={{ display: "inline-block" }} /> Novo Responsável
                    </Link>
                </div>
                <TableContainer>
                    <Table>
                        <TableCaption>Lista de responsáveis cadastrados</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Nome</Th>
                                <Th>Fone</Th>
                                <Th>e-Mail</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((entrusted: IEntrusted) => (
                                <Tr
                                    key={entrusted.id}
                                    _hover={{ cursor: "pointer", background: "#eee" }}
                                >
                                    <Td>{entrusted.id}</Td>
                                    <Td>{entrusted.name}</Td>
                                    <Td>{entrusted.phoneNumber}</Td>
                                    <Td>{entrusted.email}</Td>
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
                                                    onClick={() => onEdit(`/cadastro/responsáveis/${entrusted.id}`)}
                                                >
                                                    Editar
                                                </MenuItem>
                                                <MenuItem
                                                    icon={<BsTrash />}
                                                    onClick={() => onRemove(entrusted.id!)}
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
                {showDeleteMessage && <div className="alert alert-success">Responsável removido com sucesso!</div>}
            </div>
        </>
    );
}
