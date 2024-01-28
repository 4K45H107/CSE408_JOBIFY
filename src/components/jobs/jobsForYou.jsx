import Card from "./card";
import JobDetails from "./jobDetails";

const JobsForYou = () => {
  return (
    <div className="flex gap-x-4 mt-16">
      <div className="flex-1 h-[800px] overflow-auto px-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="flex-1 h-[800px] overflow-auto">
        <JobDetails />
      </div>
    </div>
  );
};

export default JobsForYou;
