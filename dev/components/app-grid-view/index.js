import {
  TableController,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/lit-table';
import {html, nothing} from 'lit';
import {until} from 'lit/directives/until.js';
import {paginationStyles} from '../../styles/pagination.css';
import {Database} from '../../utils/db.controller';
import {LitElementI18N, t} from '../../utils/i18n.mixins';
import '../app-dialog';
import '../app-employee-form';
import '../app-grid-item-view';
import '../app-icon-button';
import {appGridViewTableStyles} from './styles';

export class AppGridView extends LitElementI18N {
  // @ts-ignore
  tableController = new TableController(this);
  db = new Database(this);

  rowSelection = {};
  selected = null;
  modals = null; // 'edit' | 'delete'

  static properties = {
    data: {
      type: Array,
      reflect: true,
    },
  };

  static styles = [appGridViewTableStyles, paginationStyles];

  constructor(data) {
    super();
    this.data = data;
  }

  _openModal(id, modal) {
    this.modals = modal;
    this.selected = id;

    this.requestUpdate();
  }

  _closeModal() {
    this.modals = null;
    this.selected = null;

    this.requestUpdate();
  }

  async _deleteRow() {
    if (!this.selected) {
      return;
    }

    const has = await this.db.get(this.selected);
    if (!has) {
      return;
    }

    await this.db.del(this.selected);

    this._closeModal();

    window.location.reload();
  }

  async _getEmployee() {
    return await this.db.get(this.selected);
  }

  async _getSelectedEmployee() {
    let name = null;

    const employee = await this._getEmployee();
    if (!employee) {
      name = null;
    }

    name = `${employee.firstName} ${employee.lastName ?? ''}`;

    return name;
  }

  render() {
    const table = this.tableController.table({
      data: this.data,
      columns: [
        {accessorKey: 'firstName'},
        {accessorKey: 'lastName'},
        {accessorKey: 'dateOfEmployment'},
        {accessorKey: 'dateOfBirth'},
        {accessorKey: 'phone'},
        {accessorKey: 'email'},
        {accessorKey: 'department'},
        {accessorKey: 'position'},
      ],
      state: {
        // @ts-ignore
        rowSelection: this.rowSelection,
      },
      enableRowSelection: true,
      debugTable: true,
      onRowSelectionChange: (updaterOrValue) => {
        if (typeof updaterOrValue === 'function') {
          // @ts-ignore
          this.rowSelection = updaterOrValue(this.rowSelection);
        } else {
          this.rowSelection = updaterOrValue;
        }
      },
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });

    return html`
      <section>
        <div class="view">
          ${table
            .getRowModel()
            .rows.slice(0, 9)
            .map(
              (row) => html`
                <app-grid-item-view
                  .firstName="${
                    // @ts-ignore
                    row.original?.firstName
                  }"
                  .lastName="${
                    // @ts-ignore
                    row.original?.lastName ?? ''
                  }"
                  .dateOfEmployment="${
                    // @ts-ignore
                    row.original?.dateOfEmployment
                  }"
                  .dateOfBirth="${
                    // @ts-ignore
                    row.original?.dateOfBirth
                  }"
                  .phone="${
                    // @ts-ignore
                    row.original?.phone
                  }"
                  .email="${
                    // @ts-ignore
                    row.original?.email
                  }"
                  .department="${
                    // @ts-ignore
                    row.original?.department
                  }"
                  .position="${
                    // @ts-ignore
                    row.original?.position
                  }"
                >
                  <nav slot="control">
                    <app-icon-button
                      .icon="${'vaadin:edit'}"
                      @click=${() =>
                        this._openModal(
                          // @ts-ignore
                          row.original?.id,
                          'edit'
                        )}
                    >
                    </app-icon-button>
                    <app-icon-button
                      .icon="${'vaadin:trash'}"
                      @click=${() =>
                        this._openModal(
                          // @ts-ignore
                          row.original?.id,
                          'delete'
                        )}
                    >
                    </app-icon-button>
                  </nav>
                </app-grid-item-view>
              `
            )}
        </div>

        <div class="pagination">
          <button
            @click=${() => table.setPageIndex(0)}
            ?disabled="${!table.getCanPreviousPage()}"
          >
            <<
          </button>
          <button
            @click=${() => table.previousPage()}
            ?disabled=${!table.getCanPreviousPage()}
          >
            <
          </button>

          <div>
            <strong>
              ${t('messages:pagination.page', {
                index: table.getState().pagination.pageIndex + 1,
                total: Math.floor(this.data.length / 9),
              })}
            </strong>
          </div>

          <button
            @click=${() => table.nextPage()}
            ?disabled=${!table.getCanNextPage()}
          >
            >
          </button>
          <button
            @click=${() => table.setPageIndex(table.getPageCount() - 1)}
            ?disabled="${!table.getCanNextPage()}"
          >
            >>
          </button>
        </div>

        ${this.modals === 'delete' && this.selected
          ? html`
              <app-dialog
                .title="${t('messages:dialogs.delete.title')}"
                @dialog-close="${() => this._closeModal()}"
                @dialog-submit="${async () => await this._deleteRow()}"
              >
                ${until(
                  this._getSelectedEmployee().then(
                    (name) =>
                      html`${t('messages:dialogs.delete.content', {
                        employee: name,
                      })}`
                  )
                )}
              </app-dialog>
            `
          : nothing}
        ${this.modals === 'edit' && this.selected
          ? html`
              <app-dialog
                .withForm="${true}"
                .title="${t('messages:titles.editEmployee')}"
                @dialog-close="${() => this._closeModal()}"
                @dialog-submit="${async () => await this._deleteRow()}"
              >
                <app-employee-form
                  .selected="${this.selected}"
                  @dialog-close="${() => this._closeModal()}"
                ></app-employee-form>
              </app-dialog>
            `
          : nothing}
      </section>
    `;
  }
}
// @ts-ignore
customElements.define('app-grid-view', AppGridView);
