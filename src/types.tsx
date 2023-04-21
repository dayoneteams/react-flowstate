export interface FlowStateSharedConfig<Props = {}> {
  /** Tell FlowState if initial form values are valid or not on first render */
  isInitialValid?: boolean | ((props: Props) => boolean);
  /** Should FlowState reset the form when new initialValues change */
  enableReinitialize?: boolean;
}
