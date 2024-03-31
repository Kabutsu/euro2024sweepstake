import LoadingItem from './loading-item';

const LoadingGroups = () => {
  return Array.from({ length: 5 }).map((_, i) => (
    <LoadingItem key={i} />
  ));
};

export default LoadingGroups;
