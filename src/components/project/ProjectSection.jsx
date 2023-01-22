import { SectionWrapper } from '../atom/SectionWrapper';
import { Project } from './Project';
import {getListOfUrlRepositoriesUrl} from "../../lib/api-url";
import {GITHUB_USERNAME} from "../../lib/config";
import {Loader} from "../atom/Loader";
import {FETCH_ACTIONS, useFetch} from "../../hooks/useFetch";



export const ProjectSection = () => {
  // GitHub Repository - Exercise
  //const [projects, setProjects] = useState({});
  //const [fetchState, setFetchState] = useState("idle")

  const {data, status} = useFetch(getListOfUrlRepositoriesUrl(GITHUB_USERNAME))

    if(status === (FETCH_ACTIONS.PENDING || FETCH_ACTIONS.IDLE)) {
        return <Loader/>
    }

    if(status === FETCH_ACTIONS.REJECTED) {
        return <p>Error !</p>
    }


  return (
    <SectionWrapper title="Projects">
      <div className="flex flex-wrap justify-center gap-8">
          {data?.map((project) => {
              return <Project key={project.url} {...project} />
            })
          }

      </div>
    </SectionWrapper>
  );
};
