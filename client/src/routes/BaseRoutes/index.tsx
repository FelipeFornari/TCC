import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import {LoginPage} from "../../pages/LoginPage";
import {MapListPage} from "../../pages/LocalList";
import {MapFormPage} from "../../pages/LocalForm";
import {FunctionalitiesFormPage} from "../../pages/FunctionalitiesForm";
import {RegisterPage} from "../../pages/RegisterPage";
import {FunctionalitiesListPage} from "../../pages/FunctionalitiesList";
import {CitiesListPage} from "../../pages/CitiesList/indesx.tsx";
import {EntrustedFormPage} from "../../pages/EntrustedForm";
import {EntrustedListPage} from "../../pages/EntrustedList";
import {CityFormPage} from "../../pages/CitiesForm";
import {ConveniencesFormPage} from "../../pages/ConveniencesForm";
import {ConvenienceListPage} from "../../pages/ConveniencesList";
import {MapDisplayPage} from "../../pages/MapDisplay";
import {UseFormPage} from "../../pages/UseForm";
import {UseListPage} from "../../pages/UseList";
import {ResultsPage} from "../../pages/ResultsPage";

export function BaseRoutes() {
  return (
    <>
        <Routes>
            {/* Public Routes */}

            <Route path="/login" element={<LoginPage />} />

            <Route path="/" element={<MapDisplayPage />} />

            <Route path="/local/:id" element={<ResultsPage />} />
            {/* Protected Routes */}
            <Route element={<AuthenticatedRoutes />}>



                <Route path="/cadastro" element={<RegisterPage />} />

                <Route path="/cadastro/locais" element={<MapFormPage />} />
                <Route path="/cadastro/locais/new" element={<MapFormPage />} />
                <Route path="/cadastro/locais/:id" element={<MapFormPage />} />
                <Route path="/cadastro/locais/list" element={<MapListPage />} />

                <Route path="/cadastro/funcionalidades" element={<FunctionalitiesFormPage />} />
                <Route path="/cadastro/funcionalidades/new" element={<FunctionalitiesFormPage />} />
                <Route path="/cadastro/funcionalidades/:id" element={<FunctionalitiesFormPage />} />
                <Route path="/cadastro/funcionalidades/list" element={<FunctionalitiesListPage />} />

                <Route path="/cadastro/comodidades" element={<ConveniencesFormPage />} />
                <Route path="/cadastro/comodidades/new" element={<ConveniencesFormPage />} />
                <Route path="/cadastro/comodidades/:id" element={<ConveniencesFormPage />} />
                <Route path="/cadastro/comodidades/list" element={<ConvenienceListPage />} />

                <Route path="/cadastro/responsaveis" element={<EntrustedFormPage />} />
                <Route path="/cadastro/responsaveis/new" element={<EntrustedFormPage />} />
                <Route path="/cadastro/responsaveis/:id" element={<EntrustedFormPage />} />
                <Route path="/cadastro/responsaveis/list" element={<EntrustedListPage />} />

                <Route path="/cadastro/cidades" element={<CityFormPage />} />
                <Route path="/cadastro/cidades/new" element={<CityFormPage />} />
                <Route path="/cadastro/cidades/:id" element={<CityFormPage />} />
                <Route path="/cadastro/cidades/list" element={<CitiesListPage />} />

                <Route path="/cadastro/atrativos" element={<UseFormPage />} />
                <Route path="/cadastro/atrativos/new" element={<UseFormPage />} />
                <Route path="/cadastro/atrativos/:id" element={<UseFormPage />} />
                <Route path="/cadastro/atrativos/list" element={<UseListPage />} />

            </Route>
        </Routes>
    </>
  )
}
