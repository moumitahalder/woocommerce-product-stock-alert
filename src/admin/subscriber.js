/*stockalertstockalertappLocalizer*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import DataTable from 'react-data-table-component';
import PuffLoader from 'react-spinners/PuffLoader';
import { css } from '@emotion/react';
import DateRangePicker from 'rsuite/DateRangePicker';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Subscriber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriber_loading: false,
            subscription_list_status_all: false,
            all_subscriber_list: [],
            data_subscriber: [],
			data_unsubscriber: [],
			data_email_sent_subscriber: [],
			data_trash_subscriber: [],
            datasubscriber: [],
            columns_subscriber_list: [],
            date_range: ''
        };
		this.onSubChange = this.onSubChange.bind(this);
        this.handle_subscription_live_search = this.handle_subscription_live_search.bind(this);
        this.handlesubscriptionsearch = this.handlesubscriptionsearch.bind(this);
		this.handleupdatesub = this.handleupdatesub.bind(this);
    }

	handleupdatesub(e) {
		this.setState({
			date_range: e,
		});

		axios
		.get(
			`${stockalertappLocalizer.apiUrl}/mvx_stockalert_pro/v1/show_subscribe_from_status_list`,
			{
				params: { date_range: e },
			}
		).then((response) => {
			this.setState({
				datasubscriber: response.data,
			});
		});
	}

	onSubChange(e, name) {
       
    }

    handlesubscriptionsearch(e, status) {
		 if (status === 'searchproduct') {
			if (e) {
				axios
					.get(
						`${stockalertappLocalizer.apiUrl}/mvx_stockalert_pro/v1/search_subscribe_by_product`,
						{
							params: { product: e.value, date_range: this.state.date_range },
						}
					)
					.then((response) => {
						this.setState({
							datasubscriber: response.data,
						});
					});
			} else {
				axios
				.get(
					`${stockalertappLocalizer.apiUrl}/mvx_stockalert_pro/v1/show_subscribe_from_status_list`,
					{
						params: { date_range: this.state.date_range },
					}
				).then((response) => {
						this.setState({
							datasubscriber: response.data,
						});
					});
			}
		}
	}

    handle_subscription_live_search(e) {
		if (e.target.value) {
			axios
				.get(
					`${stockalertappLocalizer.apiUrl}/mvx_stockalert_pro/v1/search_specific_subscribe`,
					{
						params: { email_id: e.target.value },
					}
				)
				.then((response) => {
					this.setState({
						datasubscriber: response.data,
					});
				});
		} else {
			axios
			.get(
				`${stockalertappLocalizer.apiUrl}/mvx_stockalert_pro/v1/show_subscribe_from_status_list`,
				{
					params: { date_range: this.state.date_range },
				}
			).then((response) => {
				this.setState({
					datasubscriber: response.data,
				});
			});
		}
	}


    handle_subscription_status_check(e, type) {
		if (type === 'subscribe') {

			this.setState({
				subscription_list_status_all: false,
				subscription_list_status_subscription: true,
				subscription_list_status_unsubscription: false,
				subscription_list_status_mail_sent: false,
				subscription_list_status_trush: false,
			});
			// subscribe status
			axios
				.get(
					`${stockalertappLocalizer.apiUrl}/mvx_stockalert_pro/v1/show_subscribe_from_status_list`,
					{
						params: { subscription_status: 'woo_subscribed' },
					}
				)
				.then((response) => {
					this.setState({
						datasubscriber: response.data
					});
				});
		}

		if (type === 'unsubscribe') {
			// unsubscribe status
			this.setState({
				subscription_list_status_all: false,
				subscription_list_status_subscription: false,
				subscription_list_status_unsubscription: true,
				subscription_list_status_mail_sent: false,
				subscription_list_status_trush: false,
			});
			axios
				.get(
					`${stockalertappLocalizer.apiUrl}/mvx_stockalert_pro/v1/show_subscribe_from_status_list`,
					{
						params: { subscription_status: 'woo_unsubscribed' },
					}
				)
				.then((response) => {
					this.setState({
						datasubscriber: response.data,
					});
				});
		}

		if (type === 'mail_sent') {
			// refunded status
			this.setState({
				subscription_list_status_all: false,
				subscription_list_status_subscription: false,
				subscription_list_status_unsubscription: false,
				subscription_list_status_mail_sent: true,
				subscription_list_status_trush: false,
			});
			axios
				.get(
					`${stockalertappLocalizer.apiUrl}/mvx_stockalert_pro/v1/show_subscribe_from_status_list`,
					{
						params: { subscription_status: 'woo_mailsent' },
					}
				)
				.then((response) => {
                    console.log(response.data);
					this.setState({
						datasubscriber: response.data,
					});
				});
		}
		
		if (type === 'all') {
			this.setState({
				commission_list_status_all: true,
				commission_list_status_paid: false,
				commission_list_status_unpaid: false,
				commission_list_status_trash: false,
				commission_list_status_refunded: false,
			});

			axios
			.get(
				`${stockalertappLocalizer.apiUrl}/mvx_stockalert_pro/v1/show_subscribe_from_status_list`,
				{
					params: { date_range: this.state.date_range },
				}
			).then((response) => {
				this.setState({
					datasubscriber: response.data,
				});
			});
		}
	}

    common_funtions = (e) => {
		// subscribe status
		axios
			.get(
				`${stockalertappLocalizer.apiUrl}/mvx_stockalert_pro/v1/no_of_subscribe_list`,
				{
					params: { subscribtion_status: 'woo_subscribed', date_range: this.state.date_range },
				}
			)
			.then((response) => {
				this.setState({
					data_subscriber: response.data,
				});
			});

		// unsubscribe status
		axios
			.get(
				`${stockalertappLocalizer.apiUrl}/mvx_stockalert_pro/v1/no_of_subscribe_list`,
				{
					params: { subscribtion_status: 'woo_unsubscribed', date_range: this.state.date_range },
				}
			)
			.then((response) => {
				this.setState({
					data_unsubscriber: response.data,
				});
			});

		// mail sent status
		axios
			.get(
				`${stockalertappLocalizer.apiUrl}/mvx_stockalert_pro/v1/no_of_subscribe_list`,
				{
					params: { subscribtion_status: 'woo_mailsent', date_range: this.state.date_range },
				}
			)
			.then((response) => {
				this.setState({
					data_email_sent_subscriber: response.data,
				});
			});

		// trash status
		axios
			.get(
				`${stockalertappLocalizer.apiUrl}/mvx_stockalert_pro/v1/no_of_subscribe_list`,
				{
					params: { subscribtion_status: 'trash', date_range: this.state.date_range },
				}
			)
			.then((response) => {
				this.setState({
					data_trash_subscriber: response.data,
				});
			});
	};

    componentDidMount() {
        this.common_funtions('');
        axios
		.get(
			`${stockalertappLocalizer.apiUrl}/mvx_stockalert_pro/v1/show_subscribe_from_status_list`,
			{
				params: { date_range: this.state.date_range },
			}
		).then((response) => {
			this.setState({
				datasubscriber: response.data,
				all_subscriber_list: response.data,
				subscriber_loading: true,
			});
		});

		stockalertappLocalizer.columns_subscriber.map((data_sub, index_sub) => {
			let data_selector_sub = '';
			let set_for_dynamic_column_sub = '';
			data_selector_sub = data_sub.selector_choice;
			data_sub.selector = (row) => (
				<div
					dangerouslySetInnerHTML={{
						__html: row[data_selector_sub],
					}}
				></div>
			);

			this.state.columns_subscriber_list[index_sub] =
				data_sub;
			set_for_dynamic_column_sub =
				this.state.columns_subscriber_list;
			this.state.columns_subscriber_list =
				set_for_dynamic_column_sub;
		});
    }

    render() {
        return (
            <div className="mvx-subscriber-list">
                <div className="mvx-container">
						<div className="mvx-middle-container-wrapper">
							<div className="mvx-page-title">
								<p>
								Subscriber list
								</p>
								<div className="pull-right">
									<CSVLink
										data={this.state.datasubscriber}
										headers={stockalertappLocalizer.columns_subscriber_list}
										filename={'Subscribers.csv'}
										className="mvx-btn btn-purple"
									>
										<i className="mvx-font icon-download"></i>
										{
											stockalertappLocalizer.download_csv
										}
									</CSVLink>
								</div>
							</div>
                            <div className="mvx-search-and-multistatus-wrap">
                                <ul className="mvx-multistatus-ul">
									<li className={`mvx-multistatus-item ${this.state.subscription_list_status_all ? 'status-active' : ''}`}>
										<div
											className="mvx-multistatus-check-all status-active"
											onClick={(e) =>
												this.handle_subscription_status_check(
													e,
													'all'
												)
											}
										>
											{
												stockalertappLocalizer
													.subscription_page_string.all
											}{' '}
											(
											{
												this.state
													.all_subscriber_list
													.length
											}
											)
										</div>
									</li>
									<li className="mvx-multistatus-item mvx-divider"></li>
                                    <li className={`mvx-multistatus-item ${this.state.subscription_list_status_subscription ? 'status-active' : ''}`}>
										<div
											className="mvx-multistatus-check-subscribe"
											onClick={(e) =>
												this.handle_subscription_status_check(
													e,
													'subscribe'
												)
											}
										>
											{
												stockalertappLocalizer
													.subscription_page_string.subscribe
											}{' '}
											(
											{
												this.state.data_subscriber
													
											}
											)
										</div>
									</li>
                                    <li className="mvx-multistatus-item mvx-divider"></li>
									<li className={`mvx-multistatus-item ${this.state.subscription_list_status_unsubscription ? 'status-active' : ''}`}>
										<div
											className="mvx-multistatus-check-unpaid"
											onClick={(e) =>
												this.handle_subscription_status_check(
													e,
													'unsubscribe'
												)
											}
										>
											{
												stockalertappLocalizer
													.subscription_page_string
													.unsubscribe
											}{' '}
											(
											{
												this.state
													.data_unsubscriber
													
											}
											)
										</div>
									</li>
									<li className="mvx-multistatus-item mvx-divider"></li>
									<li className={`mvx-multistatus-item ${this.state.subscription_list_status_mail_sent ? 'status-active' : ''}`}>
										<div
											className="mvx-multistatus-check-unpaid"
											onClick={(e) =>
												this.handle_subscription_status_check(
													e,
													'mail_sent'
												)
											}
										>
											{
												stockalertappLocalizer
													.subscription_page_string
													.mail_sent
											}{' '}
											(
											{
												this.state
													.data_email_sent_subscriber
													
											}
											)
										</div>
									</li>
								</ul>

                                <div className="mvx-header-search-section">
									<label>
										<i className="mvx-font icon-search"></i>
									</label>
									<input
										type="text"
										placeholder={
											stockalertappLocalizer
                                            .subscription_page_string
											.search
										}
										onChange={
											this.handle_subscription_live_search
										}
									/>
								</div>
							</div>

							<div className="mvx-wrap-bulk-all-date">
								<Select
									placeholder={
										stockalertappLocalizer.subscription_page_string
											.show_product
									}
									options={stockalertappLocalizer.subscription_page_string.product_select}
									isClearable={true}
									className="mvx-wrap-bulk-action"
									onChange={(e) =>
										this.handlesubscriptionsearch(
											e,
											'searchproduct'
										)
									}
								/>
								
								<DateRangePicker
									onChange={(e) => this.handleupdatesub(e)}
								/>
							</div>

							{this.state.columns_subscriber_list &&
							this.state.columns_subscriber_list.length > 0 &&
							this.state.subscriber_loading ? (
								<div className="mvx-backend-datatable-wrapper">
									<DataTable
										columns={
											this.state.columns_subscriber_list
										}
										data={this.state.datasubscriber}
										selectableRows
										// onSelectedRowsChange={
										// 	this.handleSelectRowsChange
										// }
										pagination
									/>
								</div>
							) : (
								<PuffLoader
									css={override}
									color={'#cd0000'}
									size={200}
									loading={true}
								/>
							)}
						</div>
					</div>
            </div>
            );
    }
}
export default Subscriber;