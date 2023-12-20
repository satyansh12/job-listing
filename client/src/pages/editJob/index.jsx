import JobForm from '../../components/JobForm';
import JobUpdatePage from '../../components/JobUpdatePage';

export default function EditJob() {
  return (
    <JobUpdatePage>
      <JobForm action="Update job" toastMessage="Successfully updated job" />
    </JobUpdatePage>
  );
}
