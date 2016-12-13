export function widgetsFilter(widget, { crop, country }) {
  // TODO: uncomment when using real api data
  // const _crop = crop === 'all' ? 'all_crops' : 'one_crop';
  // const _country = country ? 'country' : 'global';
  //
  // return widget.tags && widget.tags.includes(_crop) && widget.tags.includes(_country);
  return true;
}
