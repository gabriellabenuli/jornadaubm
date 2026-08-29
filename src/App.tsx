import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProfileSelect from './pages/ProfileSelect'
import { PageShell } from './components/layout/PageShell'
import Dashboard from './pages/Dashboard'
import Journey from './pages/Journey'
import SubjectHome from './pages/SubjectHome'
import Lesson from './pages/Lesson'
import Exercise from './pages/Exercise'
import ErrorNotebook from './pages/ErrorNotebook'
import Simulations from './pages/Simulations'
import SimulationResultPage from './pages/SimulationResult'
import Essay from './pages/Essay'
import Achievements from './pages/Achievements'
import Performance from './pages/Performance'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfileSelect />} />
        <Route element={<PageShell />}>
          <Route path="/:studentId" element={<Dashboard />} />
          <Route path="/:studentId/jornada" element={<Journey />} />
          <Route path="/:studentId/materia/:subjectSlug" element={<SubjectHome />} />
          <Route path="/:studentId/materia/:subjectSlug/aula/:lessonId" element={<Lesson />} />
          <Route path="/:studentId/materia/:subjectSlug/exercicios/:setId" element={<Exercise />} />
          <Route path="/:studentId/redacao" element={<Essay />} />
          <Route path="/:studentId/simulados" element={<Simulations />} />
          <Route path="/:studentId/simulados/:simId/resultado" element={<SimulationResultPage />} />
          <Route path="/:studentId/caderno-de-erros" element={<ErrorNotebook />} />
          <Route path="/:studentId/conquistas" element={<Achievements />} />
          <Route path="/:studentId/desempenho" element={<Performance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
