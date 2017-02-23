/* global document */

const updateTitle = (newTitle) => {
  if (document.title !== newTitle && newTitle !== null) {
    document.title = `${newTitle} - Lukas Juhas`;
  }

  if (newTitle == null) {
    document.title = 'Lukas Juhas';
  }
};

export default updateTitle;
