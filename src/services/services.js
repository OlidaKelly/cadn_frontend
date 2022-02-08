import axios from 'axios';

const strLimit = (string, limit) => {
  const trimmed = string.substring(0, limit);
  return trimmed.substring(
    0,
    Math.min(trimmed.length, trimmed.lastIndexOf(' '))
  );
};

const stripTag = (text) => {
  return text.replace(/(<([^>]+)>)/gi, '');
};

const handleDelete = async (url, id, setter) => {
  const deleted = await axios.delete(`http://localhost:5000/${url}/${id}`);

  if (deleted) {
    axios.get(`http://localhost:5000/${url}`).then(({ data }) => {
      setter(data);
    });
  }
};

const slugify = (str) => {
  return str.toLowerCase().replace(' ', '-');
};

export default { strLimit, handleDelete, slugify, stripTag };
