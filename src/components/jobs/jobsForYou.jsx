import Card from "./card";
import JobDetails from "./jobDetails";

const JobsForYou = () => {
  const handleData = async () => {
    usernam = "t";

    try {
      const res = await axios.get("/api/user/explore/jobs/for_you");
      const jobList = res.jobs;
      console.log(jobs);
    } catch (error) {
      console.log(error);
    }
  };

  const jobLists = handleData()

  return (
    <div className="flex gap-x-4 mt-16">
      <div className="flex-1 h-[500px] overflow-auto px-4">
        <>
        {jobLists.map((job) => (
          <Card company={job.company} title={job.title} salaryMin={job.salary.min} salaryMax = {job.salary.Maximum}/>
        ))}
          
        </>
      </div>
      <div className="flex-1 h-[500px] overflow-auto">
        <JobDetails />
      </div>
    </div>
  );
};

export default JobsForYou;
