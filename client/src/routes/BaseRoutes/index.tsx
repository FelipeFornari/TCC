import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import {LoginPage} from "../../pages/LoginPage";
import {MapListPage} from "../../pages/LocalList";
import {MapFormPage} from "../../pages/LocalForm";
import {FunctionalitiesFormPage} from "../../pages/ModalitiesForm";
import {RegisterPage} from "../../pages/RegisterPage";
import {FunctionalitiesListPage} from "../../pages/ModalitiesList";
import {CitiesListPage} from "../../pages/CitiesList/indesx.tsx";
import {EntrustedFormPage} from "../../pages/EntrustedForm";
import {EntrustedListPage} from "../../pages/EntrustedList";
import {CityFormPage} from "../../pages/CitiesForm";
import {ConveniencesFormPage} from "../../pages/ConveniencesForm";
import {ConvenienceListPage} from "../../pages/ConveniencesList";
import {MapDisplayPage} from "../../pages/MapDisplay";

export function BaseRoutes() {
  return (
    <>
        <Routes>
            {/* Public Routes */}

            <Route path="/" element={<MapDisplayPage />} />

            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route element={<AuthenticatedRoutes />}>

                <Route path="/cadastro" element={<RegisterPage />} />

                <Route path="/cadastro/locais" element={<MapFormPage />} />
                <Route path="/cadastro/locais/new" element={<MapFormPage />} />
                <Route path="/cadastro/locais/:id" element={<MapFormPage />} />

                <Route path="/cadastro/locais/list" element={<MapListPage />} />

                <Route path="/cadastro/funcionalidades" element={<FunctionalitiesFormPage />} />
                <Route path="/cadastro/funcionalidades/list" element={<FunctionalitiesListPage />} />

                <Route path="/cadastro/comodidades" element={<ConveniencesFormPage />} />
                <Route path="/cadastro/comodidades/list" element={<ConvenienceListPage />} />

                <Route path="/cadastro/responsaveis" element={<EntrustedFormPage />} />
                <Route path="/cadastro/responsaveis/list" element={<EntrustedListPage />} />

                <Route path="/cadastro/cidades" element={<CityFormPage />} />
                <Route path="/cadastro/cidades/list" element={<CitiesListPage />} />

            </Route>
        </Routes>
    </>
  )
}
