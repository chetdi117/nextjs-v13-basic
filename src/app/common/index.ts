export const urlTitle = (title: string = ''): string => {
  const url = removeVietnameseTones(title).replace(/ /g, '-').toLowerCase();
  return url;
};

export const removeVietnameseTones = (str: string = ''): string => {
  str = str.replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
  str = str.replace(/đ/g, 'd');
  str = str.replace(/Đ/g, 'D');
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  str = str.replace(/[^a-zA-Z0-9 ]/g, ''); // Remove special characters
  return str;
};
